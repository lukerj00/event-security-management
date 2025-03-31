import React, { useState } from 'react';
import { EventCard } from './components/EventCard';
import { ChevronDown } from 'lucide-react';
import { Event } from './types/event';

const events: Event[] = [
  {
    event_id: 1,
    event_name: "Truck Festival",
    event_description: [
      "A vibrant 3-day music festival featuring multiple stages and diverse artists",
      "Family-friendly atmosphere with camping facilities and food vendors"
    ],
    event_type: "Music and Entertainment Events",
    event_subtype: "Music Festivals",
    event_size: 15000,
    location: "Oxfordshire",
    venue_type: "Outdoor",
    duration_days: 3,
    crowd_demographics: "Mixed",
    historical_incidents: 2,
    weather_conditions: "Sunny",
    time_of_year: "Summer",
    security_level: "High",
    event_schedule: {
      doors_open: "12:00",
      support_act: "14:00-15:00",
      main_act: "Various Artists: 16:00-23:00"
    },
    contact_information: {
      phone: "+44 1234 567890",
      email: "info@truckfestival.co.uk"
    },
    event_details: {
      type: "Music Festival",
      cost: "£120.00",
      capacity: "15,000 people",
      security_category: "CAT A"
    },
    security_history: {
      previous_events: [
        "Truck Festival 2022 - 14,500 attendees",
        "Truck Festival 2021 - 13,800 attendees",
        "Truck Festival 2019 - 12,000 attendees"
      ],
      security_performance: "Generally strong performance with minor incidents. Successful implementation of crowd management strategies and effective coordination with local authorities.",
      reported_incidents: [
        "2022: Two minor altercations at main stage",
        "2021: One case of unauthorized area access",
        "2019: Three medical emergencies (heat-related)"
      ],
      lessons_learned: [
        "Enhanced water distribution points needed during hot weather",
        "Improved CCTV coverage in peripheral areas",
        "Additional security personnel during headline acts"
      ]
    }
  },
  {
    event_id: 2,
    event_name: "Pope Benedict XVI's Papal Visit",
    event_description: [
      "Historic papal visit drawing thousands of faithful followers",
      "Major religious and cultural event with international significance"
    ],
    event_type: "Cultural and Community Events",
    event_subtype: "Religious Gatherings",
    event_size: 50000,
    location: "London",
    venue_type: "Outdoor",
    duration_days: 1,
    crowd_demographics: "Mixed",
    historical_incidents: 0,
    weather_conditions: "Cloudy",
    time_of_year: "Autumn",
    security_level: "Very High",
    event_schedule: {
      doors_open: "10:00",
      support_act: "N/A",
      main_act: "Papal Address: 12:00-14:00"
    },
    contact_information: {
      phone: "+44 20 7946 0958",
      email: "info@vatican.va"
    },
    event_details: {
      type: "Religious Gathering",
      cost: "Free",
      capacity: "50,000 people",
      security_category: "CAT A"
    },
    security_history: {
      previous_events: [
        "Papal Visit 2010 - 65,000 attendees",
        "World Youth Day Celebration 2008 - 45,000 attendees"
      ],
      security_performance: "Exemplary security operation with zero major incidents. Close collaboration between international security teams, Metropolitan Police, and private security firms.",
      reported_incidents: [
        "2010: Two medical emergencies (non-security related)",
        "2008: Minor crowd control issue at entrance gates"
      ],
      lessons_learned: [
        "Implementation of multi-agency command structure",
        "Enhanced screening procedures at entry points",
        "Improved communication systems between security teams"
      ]
    }
  },
  {
    event_id: 3,
    event_name: "Manchester City vs. Leicester City",
    event_description: [
      "Premier League football match at the iconic Etihad Stadium",
      "High-stakes competitive fixture with passionate supporter base"
    ],
    event_type: "Sporting Events",
    event_subtype: "Stadium Events - Outdoor",
    event_size: 55000,
    location: "Etihad Stadium, Manchester",
    venue_type: "Stadium",
    duration_days: 1,
    crowd_demographics: "Adult",
    historical_incidents: 5,
    weather_conditions: "Rainy",
    time_of_year: "Winter",
    security_level: "Medium",
    event_schedule: {
      doors_open: "17:00",
      support_act: "N/A",
      main_act: "Kickoff: 19:45"
    },
    contact_information: {
      phone: "+44 161 444 1894",
      email: "info@mancity.com"
    },
    event_details: {
      type: "Football Match",
      cost: "£50.00",
      capacity: "55,000 people",
      security_category: "CAT A"
    },
    security_history: {
      previous_events: [
        "Man City vs Liverpool 2023 - 54,000 attendees",
        "Man City vs United 2022 - 55,000 attendees",
        "Man City vs Chelsea 2022 - 53,000 attendees"
      ],
      security_performance: "Consistent security management with some challenges during high-profile matches. Effective coordination with Greater Manchester Police.",
      reported_incidents: [
        "2023: Two ejections for disruptive behavior",
        "2022: One flare incident in away section",
        "2022: Minor confrontation between supporter groups"
      ],
      lessons_learned: [
        "Enhanced segregation in high-risk matches",
        "Improved pre-match intelligence gathering",
        "Additional steward training for crowd management"
      ]
    }
  },
  {
    event_id: 4,
    event_name: "Michelle Obama's Book Tour",
    event_description: [
      "Intimate evening with former First Lady discussing her bestselling memoir",
      "Exclusive Q&A session and book signing opportunity"
    ],
    event_type: "High-Profile and Corporate Events",
    event_subtype: "Celebrity Appearances",
    event_size: 2000,
    location: "London's Southbank Centre",
    venue_type: "Indoor",
    duration_days: 1,
    crowd_demographics: "Mixed",
    historical_incidents: 1,
    weather_conditions: "Indoor",
    time_of_year: "Spring",
    security_level: "High",
    event_schedule: {
      doors_open: "18:00",
      support_act: "N/A",
      main_act: "Michelle Obama: 19:00-21:00"
    },
    contact_information: {
      phone: "+44 20 7921 0600",
      email: "info@southbankcentre.co.uk"
    },
    event_details: {
      type: "Book Tour",
      cost: "£75.00",
      capacity: "2,000 people",
      security_category: "CAT B"
    },
    security_history: {
      previous_events: [
        "Michelle Obama Tour 2022 - 2,000 attendees",
        "Hillary Clinton Book Event 2021 - 1,800 attendees",
        "Barack Obama Memoir Launch 2020 - 2,000 attendees"
      ],
      security_performance: "High-level security maintained throughout all events. Successful VIP protection protocols implemented.",
      reported_incidents: [
        "2022: One unauthorized photography attempt",
        "2021: Minor disruption during Q&A session",
        "2020: Attempted breach of security perimeter"
      ],
      lessons_learned: [
        "Enhanced screening of electronic devices",
        "Improved VIP arrival and departure protocols",
        "Better crowd management during book signing sessions"
      ]
    }
  },
  {
    event_id: 5,
    event_name: "Reinternment of King Richard III",
    event_description: [
      "Historic ceremony marking the reburial of a medieval English monarch",
      "Unique blend of royal, religious, and historical significance"
    ],
    event_type: "Historical and National Celebrations",
    event_subtype: "State Ceremonies",
    event_size: 10000,
    location: "Leicester Cathedral",
    venue_type: "Outdoor",
    duration_days: 1,
    crowd_demographics: "Mixed",
    historical_incidents: 0,
    weather_conditions: "Sunny",
    time_of_year: "Spring",
    security_level: "Medium",
    event_schedule: {
      doors_open: "10:00",
      support_act: "N/A",
      main_act: "Ceremony: 12:00-14:00"
    },
    contact_information: {
      phone: "+44 116 261 5200",
      email: "info@leicestercathedral.org"
    },
    event_details: {
      type: "Historical Event",
      cost: "Free",
      capacity: "10,000 people",
      security_category: "CAT B"
    },
    security_history: {
      previous_events: [
        "Royal Visit 2022 - 8,000 attendees",
        "Cathedral Commemoration 2021 - 5,000 attendees",
        "Historical Reenactment 2020 - 7,000 attendees"
      ],
      security_performance: "Excellent crowd management and dignified event security. Strong collaboration with local authorities.",
      reported_incidents: [
        "2022: Two medical assistance cases",
        "2021: Minor crowd control issue at viewing area",
        "2020: One case of unauthorized media access"
      ],
      lessons_learned: [
        "Improved queue management systems",
        "Enhanced media accreditation process",
        "Better coordination with emergency services"
      ]
    }
  },
  {
    event_id: 6,
    event_name: "Body Worlds 4 Exhibition",
    event_description: [
      "Groundbreaking anatomical exhibition featuring preserved human specimens",
      "Educational journey through the human body with interactive displays"
    ],
    event_type: "Exhibitions and Public Displays",
    event_subtype: "Museum Exhibitions",
    event_size: 5000,
    location: "Manchester Arena",
    venue_type: "Indoor",
    duration_days: 30,
    crowd_demographics: "Mixed",
    historical_incidents: 3,
    weather_conditions: "Indoor",
    time_of_year: "Summer",
    security_level: "Low",
    event_schedule: {
      doors_open: "10:00",
      support_act: "N/A",
      main_act: "Exhibition Hours: 10:00-18:00"
    },
    contact_information: {
      phone: "+44 161 950 5000",
      email: "info@manchester-arena.com"
    },
    event_details: {
      type: "Art Exhibition",
      cost: "£25.00",
      capacity: "5,000 people per day",
      security_category: "CAT C"
    },
    security_history: {
      previous_events: [
        "Body Worlds 3 - 150,000 total visitors",
        "Science Exhibition 2022 - 120,000 total visitors",
        "Art Installation 2021 - 90,000 total visitors"
      ],
      security_performance: "Consistent security management with focus on artifact protection and visitor safety.",
      reported_incidents: [
        "2022: Three cases of attempted photography in restricted areas",
        "2021: Minor damage to information display",
        "2021: Two cases of unauthorized access attempts"
      ],
      lessons_learned: [
        "Enhanced signage for restricted areas",
        "Improved security camera placement",
        "Additional staff training for artifact protection"
      ]
    }
  },
  {
    event_id: 7,
    event_name: "University of Oxford Graduation",
    event_description: [
      "Traditional ceremony celebrating academic achievement at historic Sheldonian Theatre",
      "Formal procession and conferment of degrees with ancient customs"
    ],
    event_type: "Educational and Institutional Events",
    event_subtype: "Academic Ceremonies",
    event_size: 2000,
    location: "Sheldonian Theatre, Oxford",
    venue_type: "Indoor",
    duration_days: 1,
    crowd_demographics: "Mixed",
    historical_incidents: 0,
    weather_conditions: "Indoor",
    time_of_year: "Summer",
    security_level: "Low",
    event_schedule: {
      doors_open: "09:00",
      support_act: "N/A",
      main_act: "Ceremony: 10:00-12:00"
    },
    contact_information: {
      phone: "+44 1865 270000",
      email: "info@ox.ac.uk"
    },
    event_details: {
      type: "Graduation Ceremony",
      cost: "Free",
      capacity: "2,000 people",
      security_category: "CAT C"
    },
    security_history: {
      previous_events: [
        "Summer Graduation 2023 - 1,900 attendees",
        "Winter Graduation 2022 - 1,800 attendees",
        "Honorary Degree Ceremony 2022 - 1,500 attendees"
      ],
      security_performance: "Excellent track record with formal ceremonial security protocols well established.",
      reported_incidents: [
        "2023: One case of lost credentials",
        "2022: Minor seating arrangement issue",
        "2022: Late arrival of VIP guest"
      ],
      lessons_learned: [
        "Streamlined credential verification process",
        "Improved guest arrival coordination",
        "Enhanced communication with degree recipients"
      ]
    }
  },
  {
    event_id: 8,
    event_name: "HSBC City Ride - Glasgow",
    event_description: [
      "Mass participation cycling event through Glasgow's iconic streets",
      "Family-friendly urban adventure promoting active lifestyle"
    ],
    event_type: "Outdoor and Adventure Events",
    event_subtype: "Urban Sports Events",
    event_size: 10000,
    location: "Glasgow City Centre",
    venue_type: "Outdoor",
    duration_days: 1,
    crowd_demographics: "Mixed",
    historical_incidents: 1,
    weather_conditions: "Sunny",
    time_of_year: "Summer",
    security_level: "Medium",
    event_schedule: {
      doors_open: "07:00",
      support_act: "N/A",
      main_act: "Race Start: 09:00"
    },
    contact_information: {
      phone: "+44 141 287 2000",
      email: "info@hsbccityride.com"
    },
    event_details: {
      type: "Cycling Event",
      cost: "£30.00",
      capacity: "10,000 participants",
      security_category: "CAT B"
    },
    security_history: {
      previous_events: [
        "City Ride 2023 - 9,500 participants",
        "Marathon 2022 - 12,000 participants",
        "Cycling Festival 2021 - 8,000 participants"
      ],
      security_performance: "Strong route security and participant safety management. Effective traffic control measures.",
      reported_incidents: [
        "2023: Two minor cycling accidents",
        "2022: One unauthorized vehicle on route",
        "2021: Medical emergency (dehydration)"
      ],
      lessons_learned: [
        "Enhanced route barrier systems",
        "Improved medical support distribution",
        "Better coordination with traffic police"
      ]
    }
  },
  {
    event_id: 9,
    event_name: "Climate Change Protest",
    event_description: [
      "Large-scale environmental demonstration at Parliament Square",
      "Peaceful protest advocating for urgent climate action"
    ],
    event_type: "Political and Diplomatic Events",
    event_subtype: "Public Protests and Demonstrations",
    event_size: 20000,
    location: "Parliament Square, London",
    venue_type: "Outdoor",
    duration_days: 1,
    crowd_demographics: "Mixed",
    historical_incidents: 5,
    weather_conditions: "Rainy",
    time_of_year: "Autumn",
    security_level: "High",
    event_schedule: {
      doors_open: "10:00",
      support_act: "N/A",
      main_act: "Protest: 12:00-16:00"
    },
    contact_information: {
      phone: "+44 20 7222 1222",
      email: "info@climateprotest.co.uk"
    },
    event_details: {
      type: "Public Protest",
      cost: "Free",
      capacity: "20,000 people",
      security_category: "CAT A"
    },
    security_history: {
      previous_events: [
        "Climate March 2023 - 25,000 attendees",
        "Environmental Rally 2022 - 18,000 attendees",
        "Earth Day Protest 2021 - 15,000 attendees"
      ],
      security_performance: "Mixed performance with some challenges in managing spontaneous direct action groups. Good coordination with protest organizers.",
      reported_incidents: [
        "2023: Several attempts to breach security barriers",
        "2022: Two lock-on incidents at government buildings",
        "2021: Multiple small unauthorized demonstrations"
      ],
      lessons_learned: [
        "Need for improved rapid response teams",
        "Better communication with protest organizers",
        "Enhanced training for dealing with peaceful civil disobedience"
      ]
    }
  },
  {
    event_id: 10,
    event_name: "Immersive Van Gogh Exhibition",
    event_description: [
      "State-of-the-art digital art experience featuring Van Gogh masterpieces",
      "360-degree immersive journey through iconic paintings"
    ],
    event_type: "Hybrid and Multi-Disciplinary Events",
    event_subtype: "Interactive Exhibitions",
    event_size: 3000,
    location: "London",
    venue_type: "Indoor",
    duration_days: 60,
    crowd_demographics: "Mixed",
    historical_incidents: 2,
    weather_conditions: "Indoor",
    time_of_year: "Spring",
    security_level: "Low",
    event_schedule: {
      doors_open: "10:00",
      support_act: "N/A",
      main_act: "Exhibition Hours: 10:00-20:00"
    },
    contact_information: {
      phone: "+44 20 7946 0958",
      email: "info@vangoghexhibition.co.uk"
    },
    event_details: {
      type: "Art Exhibition",
      cost: "£35.00",
      capacity: "3,000 people per day",
      security_category: "CAT C"
    },
    security_history: {
      previous_events: [
        "Digital Art Show 2023 - 80,000 total visitors",
        "Interactive Exhibition 2022 - 65,000 total visitors",
        "Multimedia Experience 2021 - 50,000 total visitors"
      ],
      security_performance: "Good overall security with focus on equipment protection and visitor safety in interactive spaces.",
      reported_incidents: [
        "2023: Two cases of equipment misuse",
        "2022: Minor technical security breach",
        "2021: One case of unauthorized recording"
      ],
      lessons_learned: [
        "Enhanced equipment protection measures",
        "Improved visitor guidance in interactive areas",
        "Better monitoring of recording devices"
      ]
    }
  },
  {
    event_id: 101,
    event_name: "GFGH Live at The Lowry",
    event_description: [
      "Intimate concert performance in The Lowry's prestigious venue",
      "Evening of contemporary music with special guest appearances"
    ],
    event_type: "Music and Entertainment Events",
    event_subtype: "Indoor Concerts",
    event_size: 1730,
    location: "The Lowry, Pier 8, Salford Quays, Manchester, M50 3AZ, United Kingdom",
    venue_type: "Indoor",
    duration_days: 1,
    crowd_demographics: "Adult",
    historical_incidents: 2,
    weather_conditions: "Indoor",
    time_of_year: "Autumn",
    security_level: "Medium",
    event_schedule: {
      doors_open: "18:00",
      support_act: "19:00-19:45",
      main_act: "GFGH: 20:00-22:30"
    },
    contact_information: {
      phone: "+44 161 876 2000",
      email: "info@livenation.co.uk"
    },
    event_details: {
      type: "Concert",
      cost: "£45.00",
      capacity: "1,730 people",
      security_category: "CAT B"
    },
    security_history: {
      previous_events: [
        "GFGH Tour 2023 - 1,700 attendees",
        "Similar Artist Concert 2022 - 1,650 attendees",
        "Venue Anniversary Show 2021 - 1,500 attendees"
      ],
      security_performance: "Effective crowd management in intimate venue setting. Strong access control measures.",
      reported_incidents: [
        "2023: One case of unauthorized backstage access attempt",
        "2022: Minor altercation in queue",
        "2021: Two medical assistance cases"
      ],
      lessons_learned: [
        "Improved backstage security protocols",
        "Enhanced queue management system",
        "Better coordination with venue medical team"
      ]
    }
  },
  {
    event_id: 102,
    event_name: "Manchester Food Festival",
    event_description: [
      "Celebration of local and international cuisine in Cathedral Gardens",
      "Three days of culinary demonstrations, tastings, and workshops"
    ],
    event_type: "Food and Cultural Events",
    event_subtype: "Food Festivals",
    event_size: 5000,
    location: "Cathedral Gardens, Manchester, M4 3BG, United Kingdom",
    venue_type: "Outdoor",
    duration_days: 3,
    crowd_demographics: "Family",
    historical_incidents: 1,
    weather_conditions: "Variable",
    time_of_year: "Summer",
    security_level: "Low",
    event_schedule: {
      doors_open: "10:00",
      support_act: "N/A",
      main_act: "10:00-22:00 Daily"
    },
    contact_information: {
      phone: "+44 161 234 5678",
      email: "info@manchesterfoodfest.com"
    },
    event_details: {
      type: "Festival",
      cost: "£15.00",
      capacity: "5,000 people daily",
      security_category: "CAT C"
    },
    security_history: {
      previous_events: [
        "Food Festival 2023 - 15,000 total visitors",
        "Street Food Event 2022 - 12,000 total visitors",
        "Taste of Manchester 2021 - 10,000 total visitors"
      ],
      security_performance: "Good management of food safety and crowd flow. Effective vendor security protocols.",
      reported_incidents: [
        "2023: Two cases of minor food safety concerns",
        "2022: One lost child (quickly reunited)",
        "2021: Minor issue with unauthorized vendor"
      ],
      lessons_learned: [
        "Enhanced food safety inspection protocols",
        "Improved lost child procedures",
        "Better vendor verification system"
      ]
    }
  }
];

function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event>(events[0]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Event Security Management
        </h1>
        
        <div className="max-w-4xl mx-auto mb-8 relative">
          <select
            value={selectedEvent.event_id}
            onChange={(e) => {
              const event = events.find(ev => ev.event_id === Number(e.target.value));
              if (event) setSelectedEvent(event);
            }}
            className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none cursor-pointer pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {events.map(event => (
              <option key={event.event_id} value={event.event_id}>
                {event.event_name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        <EventCard event={selectedEvent} />
      </div>
    </div>
  );
}

export default App;