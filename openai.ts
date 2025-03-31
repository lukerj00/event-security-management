import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ASSISTANT_ID = "asst_zSICXZIWrsbVmxoiM6vifpC7"; // Your Assistant ID
const FINE_TUNED_MODEL = "ft:gpt-4o-mini-2024-07-18:personal:v3-evildone:AowXM0mB";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface RiskAssessmentInput {
  event_type: string;
  location: string;
  event_size: number;
  venue_type: string;
  duration_days: number;
  crowd_demographics: string;
  historical_incidents: number;
  security_level: string;
  time_of_year: string;
  event_description: string[];
}

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
});

/**
 * Retrieves relevant information from the OpenAI Assistant connected to a vector database.
 */
async function retrieveRelevantInformation(input: RiskAssessmentInput): Promise<string> {
  try {
    // Create a thread and add a message in one step (if supported by the API)
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: JSON.stringify(input, null, 2),
    });

    // Start the run
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    // Poll for completion with a shorter interval
    let response;
    let attempts = 0;
    const maxAttempts = 30; // Timeout after 30 seconds
    while (attempts < maxAttempts) {
      const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      if (runStatus.status === "completed") {
        const messages = await openai.beta.threads.messages.list(thread.id);
        response = messages.data[0].content[0].text.value;
        console.log('Assistant Response:', response);
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 500)); // Poll every 500ms
      attempts++;
    }

    if (!response) {
      throw new Error('Assistant response timed out');
    }

    return response;
  } catch (error) {
    console.error('Error retrieving relevant information:', error);
    return '';
  }
}

/**
 * Assesses the risk of an event using the OpenAI model and relevant information from the Assistant.
 */
export async function assessEventRisk(input: RiskAssessmentInput): Promise<{
  riskLevel: string;
  categories: {
    category: string;
    risk: string;
    description: string;
  }[];
}> {
  if (!API_KEY) {
    console.warn('OpenAI API key not configured. Using default risk assessment.');
    return {
      riskLevel: "Pending",
      categories: []
    };
  }

  // Step 1: Retrieve relevant information from the Assistant
  const relevantInformation = await retrieveRelevantInformation(input);
  console.log('Relevant Information:', relevantInformation); // Log the relevant information

  // Step 2: Pass the relevant information to the risk assessment model
  try {
    const userContent = JSON.stringify(input, null, 2) + `\n\nRelevant Information:\n${relevantInformation}`;
    console.log('User Content:', userContent); // Log the user content

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a security risk assessment system following PROTECT UK guidelines. Analyze the event details and provide:
1. An overall risk level (High, Medium, or Low)
2. Analysis of the following terrorism risk categories from PROTECT UK:
   - Person-Borne IED (PBIED)
   - Vehicle-Borne IED (VBIED)
   - Vehicle as a Weapon (VAW)
   - Marauding Terrorist Attack (MTA)
   - Fire as a Weapon (FAW)
   - Chemical-Biological-Radiological Attack (CBR)
   - Cyber Attack
   - Insider Threat

**Important Instructions:**
- Focus solely on describing the risk relevant to the event.
- Do not mention any control measures, mitigations, or recommendations.
- Keep the descriptions concise and factual.

Respond in JSON format:
{
  "riskLevel": "High/Medium/Low",
  "categories": [
    {
      "category": "Category Name",
      "risk": "High/Medium/Low",
      "description": "Brief analysis of why this risk level was assigned. Focus only on describing the risk, without mentioning any mitigations"
    }
  ]
}`
        },
        {
          role: "user",
          content: userContent
        }
      ],
      temperature: 0,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from API');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error assessing event risk:', error);
    return {
      riskLevel: "Error",
      categories: []
    };
  }
}

export async function getTargetAttractiveness(event: RiskAssessmentInput & { event_id?: number }): Promise<string> {
  if (!API_KEY) {
    return "Unable to analyze target attractiveness - API key not configured.";
  }

  // First, check if we have a cached analysis in the database
  if (event.event_id) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('target_attractiveness')
        .eq('id', event.event_id)
        .maybeSingle();

      if (!error && data?.target_attractiveness) {
        return data.target_attractiveness;
      }
    } catch (error) {
      console.error('Error fetching target attractiveness:', error);
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a security risk assessment tool designed to evaluate terrorism risks for events. Analyze the event and provide a **concise summary** of the key factors that make the event an attractive target for terrorists. Focus on the following points:

- Event profile and potential for maximum impact
- Symbolic value of the location and event type
- Crowd density and vulnerability
- Media attention potential
- Access points and security measures
- Historical significance and precedent

**Instructions:**
- Provide a combined summary of the key points.
- Keep the response concise and focused.
- Avoid lengthy explanations or unnecessary details.
- Do not include recommendations or mitigations.`
        },
        {
          role: "user",
          content: `Event type: ${event.event_type}
Location: ${event.location}
Expected attendance: ${event.event_size}
Venue type: ${event.venue_type}
Duration: ${event.duration_days} days
Demographics: ${event.crowd_demographics}
Time of year: ${event.time_of_year}

Additional context:
${event.event_description.join('\n')}`
        }
      ],
      temperature: 0.1, // Low temperature for deterministic output
      max_tokens: 300 // Limit the response length for brevity
    });

    const analysis = response.choices[0].message.content || "Unable to generate target attractiveness analysis.";

    // Store the analysis in the database if we have an event_id
    if (event.event_id) {
      try {
        const { error } = await supabase.rpc(
          'update_event_target_attractiveness',
          {
            p_event_id: event.event_id,
            p_target_attractiveness: analysis
          }
        );

        if (error) {
          console.error('Error storing target attractiveness:', error);
        }
      } catch (error) {
        console.error('Error calling update function:', error);
      }
    }

    return analysis;
  } catch (error) {
    console.error('Error analyzing target attractiveness:', error);
    return "Error analyzing target attractiveness.";
  }
}

export async function classifyEvent(description: string[]): Promise<{ mainType: string; subType: string }> {
  if (!API_KEY) {
    console.warn('OpenAI API key not configured. Using default event types.');
    return {
      mainType: "Event Type",
      subType: "Event Subtype"
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an event classifier. Analyze the event description and respond with exactly two lines:\nSports Event\nProfessional Football Match\n\nDo not include labels or prefixes like 'Line 1:' or 'Main Event Type:'. Just the two classifications, one per line."
        },
        {
          role: "user",
          content: description.join("\n")
        }
      ],
      temperature: 0
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from API');
    }

    // Split the response into lines and clean them up
    const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
    
    return {
      mainType: lines[0] || "Event Type",
      subType: lines[1] || "Event Subtype"
    };
  } catch (error) {
    console.error('Error classifying event:', error);
    return {
      mainType: "Event Type",
      subType: "Event Subtype"
    };
  }
}