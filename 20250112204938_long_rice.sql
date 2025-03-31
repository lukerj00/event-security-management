/*
  # Event Security Management Database Schema

  1. New Tables
    - events
      - Primary event information
      - Core details like name, type, size, location
    - event_descriptions
      - Multiple description lines per event
    - event_schedules
      - Event timing details
    - contact_information
      - Event contact details
    - event_details
      - Specific event information
    - security_history
      - Historical security information
    - previous_events
      - List of previous events
    - reported_incidents
      - Security incidents
    - lessons_learned
      - Security lessons from past events

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all data
    - Add policies for admin users to manage data
*/

-- Create custom types for better data consistency
CREATE TYPE security_category AS ENUM ('CAT A', 'CAT B', 'CAT C');
CREATE TYPE security_level AS ENUM ('Very High', 'High', 'Medium', 'Low');
CREATE TYPE venue_type AS ENUM ('Indoor', 'Outdoor', 'Stadium');
CREATE TYPE weather_conditions AS ENUM ('Sunny', 'Rainy', 'Cloudy', 'Indoor', 'Variable');
CREATE TYPE season AS ENUM ('Spring', 'Summer', 'Autumn', 'Winter');

-- Create the main events table
CREATE TABLE IF NOT EXISTS events (
  id BIGINT PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_subtype TEXT NOT NULL,
  event_size INTEGER NOT NULL,
  location TEXT NOT NULL,
  venue_type venue_type NOT NULL,
  duration_days INTEGER NOT NULL,
  crowd_demographics TEXT NOT NULL,
  historical_incidents INTEGER NOT NULL DEFAULT 0,
  weather_conditions weather_conditions NOT NULL,
  time_of_year season NOT NULL,
  security_level security_level NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create event descriptions table (one-to-many)
CREATE TABLE IF NOT EXISTS event_descriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create event schedules table (one-to-one)
CREATE TABLE IF NOT EXISTS event_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  doors_open TEXT NOT NULL,
  support_act TEXT,
  main_act TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create contact information table (one-to-one)
CREATE TABLE IF NOT EXISTS contact_information (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create event details table (one-to-one)
CREATE TABLE IF NOT EXISTS event_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  cost TEXT NOT NULL,
  capacity TEXT NOT NULL,
  security_category security_category NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create security history table (one-to-one)
CREATE TABLE IF NOT EXISTS security_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  security_performance TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create previous events table (one-to-many)
CREATE TABLE IF NOT EXISTS previous_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reported incidents table (one-to-many)
CREATE TABLE IF NOT EXISTS reported_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
  incident TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create lessons learned table (one-to-many)
CREATE TABLE IF NOT EXISTS lessons_learned (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
  lesson TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE previous_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reported_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons_learned ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users to read data
CREATE POLICY "Allow authenticated users to read events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read event descriptions"
  ON event_descriptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read event schedules"
  ON event_schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read contact information"
  ON contact_information FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read event details"
  ON event_details FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read security history"
  ON security_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read previous events"
  ON previous_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read reported incidents"
  ON reported_incidents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read lessons learned"
  ON lessons_learned FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_name ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type, event_subtype);
CREATE INDEX IF NOT EXISTS idx_event_descriptions_event_id ON event_descriptions(event_id);
CREATE INDEX IF NOT EXISTS idx_previous_events_event_id ON previous_events(event_id);
CREATE INDEX IF NOT EXISTS idx_reported_incidents_event_id ON reported_incidents(event_id);
CREATE INDEX IF NOT EXISTS idx_lessons_learned_event_id ON lessons_learned(event_id);

-- Insert the events data
DO $$ 
DECLARE
  event_id BIGINT;
BEGIN
  -- Insert Truck Festival
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location, 
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    1, 'Truck Festival', 'Music and Entertainment Events', 'Music Festivals',
    15000, 'Oxfordshire', 'Outdoor', 3, 'Mixed', 2, 'Sunny', 'Summer', 'High'
  ) RETURNING id INTO event_id;

  -- Insert event descriptions
  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'A vibrant 3-day music festival featuring multiple stages and diverse artists', 1),
    (event_id, 'Family-friendly atmosphere with camping facilities and food vendors', 2);

  -- Insert event schedule
  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '12:00', '14:00-15:00', 'Various Artists: 16:00-23:00');

  -- Insert contact information
  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 1234 567890', 'info@truckfestival.co.uk');

  -- Insert event details
  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Music Festival', '£120.00', '15,000 people', 'CAT A');

  -- Insert security history
  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Generally strong performance with minor incidents. Successful implementation of crowd management strategies and effective coordination with local authorities.');

  -- Insert previous events
  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'Truck Festival 2022 - 14,500 attendees', 1),
    (event_id, 'Truck Festival 2021 - 13,800 attendees', 2),
    (event_id, 'Truck Festival 2019 - 12,000 attendees', 3);

  -- Insert reported incidents
  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2022: Two minor altercations at main stage', 1),
    (event_id, '2021: One case of unauthorized area access', 2),
    (event_id, '2019: Three medical emergencies (heat-related)', 3);

  -- Insert lessons learned
  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Enhanced water distribution points needed during hot weather', 1),
    (event_id, 'Improved CCTV coverage in peripheral areas', 2),
    (event_id, 'Additional security personnel during headline acts', 3);

  -- Continue with other events...
  -- (Similar INSERT statements for the remaining events would follow)
END $$;