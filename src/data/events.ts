import { Event } from '../types/eventTypes';

export const events: Event[] = [
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
  }
]; 