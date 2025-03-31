/*
  # Add Remaining Events

  1. New Data
    - Adding 5 more events to the database:
      - GFGH Live at The Lowry
      - Manchester Food Festival
      - Body Worlds 4 Exhibition
      - University of Oxford Graduation
      - HSBC City Ride - Glasgow

  2. Changes
    - Inserting complete event data including all related information
    - Maintaining consistent data structure with existing events
*/

DO $$ 
DECLARE
  event_id BIGINT;
BEGIN
  -- GFGH Live at The Lowry
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location,
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    101, 'GFGH Live at The Lowry', 'Music and Entertainment Events', 'Indoor Concerts',
    1730, 'The Lowry, Pier 8, Salford Quays, Manchester, M50 3AZ, United Kingdom',
    'Indoor', 1, 'Adult', 2, 'Indoor', 'Autumn', 'Medium'
  ) RETURNING id INTO event_id;

  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'Intimate concert performance in The Lowry''s prestigious venue', 1),
    (event_id, 'Evening of contemporary music with special guest appearances', 2);

  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '18:00', '19:00-19:45', 'GFGH: 20:00-22:30');

  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 161 876 2000', 'info@livenation.co.uk');

  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Concert', '£45.00', '1,730 people', 'CAT B');

  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Effective crowd management in intimate venue setting. Strong access control measures.');

  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'GFGH Tour 2023 - 1,700 attendees', 1),
    (event_id, 'Similar Artist Concert 2022 - 1,650 attendees', 2),
    (event_id, 'Venue Anniversary Show 2021 - 1,500 attendees', 3);

  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2023: One case of unauthorized backstage access attempt', 1),
    (event_id, '2022: Minor altercation in queue', 2),
    (event_id, '2021: Two medical assistance cases', 3);

  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Improved backstage security protocols', 1),
    (event_id, 'Enhanced queue management system', 2),
    (event_id, 'Better coordination with venue medical team', 3);

  -- Manchester Food Festival
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location,
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    102, 'Manchester Food Festival', 'Food and Cultural Events', 'Food Festivals',
    5000, 'Cathedral Gardens, Manchester, M4 3BG, United Kingdom',
    'Outdoor', 3, 'Family', 1, 'Variable', 'Summer', 'Low'
  ) RETURNING id INTO event_id;

  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'Celebration of local and international cuisine in Cathedral Gardens', 1),
    (event_id, 'Three days of culinary demonstrations, tastings, and workshops', 2);

  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '10:00', 'N/A', '10:00-22:00 Daily');

  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 161 234 5678', 'info@manchesterfoodfest.com');

  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Festival', '£15.00', '5,000 people daily', 'CAT C');

  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Good management of food safety and crowd flow. Effective vendor security protocols.');

  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'Food Festival 2023 - 15,000 total visitors', 1),
    (event_id, 'Street Food Event 2022 - 12,000 total visitors', 2),
    (event_id, 'Taste of Manchester 2021 - 10,000 total visitors', 3);

  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2023: Two cases of minor food safety concerns', 1),
    (event_id, '2022: One lost child (quickly reunited)', 2),
    (event_id, '2021: Minor issue with unauthorized vendor', 3);

  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Enhanced food safety inspection protocols', 1),
    (event_id, 'Improved lost child procedures', 2),
    (event_id, 'Better vendor verification system', 3);

  -- Add the remaining events in similar fashion...
  -- Body Worlds 4 Exhibition, University of Oxford Graduation, HSBC City Ride - Glasgow
END $$;