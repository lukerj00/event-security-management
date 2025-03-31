export interface EventSchedule {
  doors_open: string;
  support_act: string;
  main_act: string;
}

export interface ContactInformation {
  phone: string;
  email: string;
}

export interface EventDetails {
  type: string;
  cost: string;
  capacity: string;
  security_category: string;
}

export interface SecurityHistory {
  previous_events: string[];
  security_performance: string;
  reported_incidents: string[];
  lessons_learned: string[];
}

export interface Event {
  event_id: number;
  event_name: string;
  event_description: string[];  // Added this field
  event_type: string;
  event_subtype: string;
  event_size: number;
  location: string;
  venue_type: string;
  duration_days: number;
  crowd_demographics: string;
  historical_incidents: number;
  weather_conditions: string;
  time_of_year: string;
  security_level: string;
  event_schedule: EventSchedule;
  contact_information: ContactInformation;
  event_details: EventDetails;
  security_history: SecurityHistory;
}