/*
  # Add remaining events

  1. New Events
    - Body Worlds 4 Exhibition
    - University of Oxford Graduation
    - HSBC City Ride - Glasgow
    - Climate Change Protest
    - Immersive Van Gogh Exhibition

  2. Data Structure
    - Each event includes:
      - Main event details
      - Event descriptions
      - Schedule information
      - Contact details
      - Security history
      - Previous events
      - Reported incidents
      - Lessons learned
*/

DO $$ 
DECLARE
  event_id BIGINT;
BEGIN
  -- Body Worlds 4 Exhibition
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location,
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    103, 'Body Worlds 4 Exhibition', 'Exhibitions and Public Displays', 'Museum Exhibitions',
    5000, 'Manchester Arena', 'Indoor', 30, 'Mixed', 3, 'Indoor', 'Summer', 'Low'
  ) RETURNING id INTO event_id;

  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'Groundbreaking anatomical exhibition featuring preserved human specimens', 1),
    (event_id, 'Educational journey through the human body with interactive displays', 2);

  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '10:00', 'N/A', 'Exhibition Hours: 10:00-18:00');

  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 161 950 5000', 'info@manchester-arena.com');

  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Art Exhibition', '£25.00', '5,000 people per day', 'CAT C');

  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Consistent security management with focus on artifact protection and visitor safety.');

  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'Body Worlds 3 - 150,000 total visitors', 1),
    (event_id, 'Science Exhibition 2022 - 120,000 total visitors', 2),
    (event_id, 'Art Installation 2021 - 90,000 total visitors', 3);

  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2022: Three cases of attempted photography in restricted areas', 1),
    (event_id, '2021: Minor damage to information display', 2),
    (event_id, '2021: Two cases of unauthorized access attempts', 3);

  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Enhanced signage for restricted areas', 1),
    (event_id, 'Improved security camera placement', 2),
    (event_id, 'Additional staff training for artifact protection', 3);

  -- University of Oxford Graduation
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location,
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    104, 'University of Oxford Graduation', 'Educational and Institutional Events', 'Academic Ceremonies',
    2000, 'Sheldonian Theatre, Oxford', 'Indoor', 1, 'Mixed', 0, 'Indoor', 'Summer', 'Low'
  ) RETURNING id INTO event_id;

  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'Traditional ceremony celebrating academic achievement at historic Sheldonian Theatre', 1),
    (event_id, 'Formal procession and conferment of degrees with ancient customs', 2);

  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '09:00', 'N/A', 'Ceremony: 10:00-12:00');

  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 1865 270000', 'info@ox.ac.uk');

  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Graduation Ceremony', 'Free', '2,000 people', 'CAT C');

  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Excellent track record with formal ceremonial security protocols well established.');

  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'Summer Graduation 2023 - 1,900 attendees', 1),
    (event_id, 'Winter Graduation 2022 - 1,800 attendees', 2),
    (event_id, 'Honorary Degree Ceremony 2022 - 1,500 attendees', 3);

  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2023: One case of lost credentials', 1),
    (event_id, '2022: Minor seating arrangement issue', 2),
    (event_id, '2022: Late arrival of VIP guest', 3);

  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Streamlined credential verification process', 1),
    (event_id, 'Improved guest arrival coordination', 2),
    (event_id, 'Enhanced communication with degree recipients', 3);

  -- HSBC City Ride - Glasgow
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location,
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    105, 'HSBC City Ride - Glasgow', 'Outdoor and Adventure Events', 'Urban Sports Events',
    10000, 'Glasgow City Centre', 'Outdoor', 1, 'Mixed', 1, 'Sunny', 'Summer', 'Medium'
  ) RETURNING id INTO event_id;

  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'Mass participation cycling event through Glasgow''s iconic streets', 1),
    (event_id, 'Family-friendly urban adventure promoting active lifestyle', 2);

  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '07:00', 'N/A', 'Race Start: 09:00');

  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 141 287 2000', 'info@hsbccityride.com');

  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Cycling Event', '£30.00', '10,000 participants', 'CAT B');

  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Strong route security and participant safety management. Effective traffic control measures.');

  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'City Ride 2023 - 9,500 participants', 1),
    (event_id, 'Marathon 2022 - 12,000 participants', 2),
    (event_id, 'Cycling Festival 2021 - 8,000 participants', 3);

  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2023: Two minor cycling accidents', 1),
    (event_id, '2022: One unauthorized vehicle on route', 2),
    (event_id, '2021: Medical emergency (dehydration)', 3);

  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Enhanced route barrier systems', 1),
    (event_id, 'Improved medical support distribution', 2),
    (event_id, 'Better coordination with traffic police', 3);

  -- Climate Change Protest
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location,
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    106, 'Climate Change Protest', 'Political and Diplomatic Events', 'Public Protests and Demonstrations',
    20000, 'Parliament Square, London', 'Outdoor', 1, 'Mixed', 5, 'Rainy', 'Autumn', 'High'
  ) RETURNING id INTO event_id;

  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'Large-scale environmental demonstration at Parliament Square', 1),
    (event_id, 'Peaceful protest advocating for urgent climate action', 2);

  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '10:00', 'N/A', 'Protest: 12:00-16:00');

  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 20 7222 1222', 'info@climateprotest.co.uk');

  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Public Protest', 'Free', '20,000 people', 'CAT A');

  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Mixed performance with some challenges in managing spontaneous direct action groups. Good coordination with protest organizers.');

  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'Climate March 2023 - 25,000 attendees', 1),
    (event_id, 'Environmental Rally 2022 - 18,000 attendees', 2),
    (event_id, 'Earth Day Protest 2021 - 15,000 attendees', 3);

  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2023: Several attempts to breach security barriers', 1),
    (event_id, '2022: Two lock-on incidents at government buildings', 2),
    (event_id, '2021: Multiple small unauthorized demonstrations', 3);

  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Need for improved rapid response teams', 1),
    (event_id, 'Better communication with protest organizers', 2),
    (event_id, 'Enhanced training for dealing with peaceful civil disobedience', 3);

  -- Immersive Van Gogh Exhibition
  INSERT INTO events (
    id, event_name, event_type, event_subtype, event_size, location,
    venue_type, duration_days, crowd_demographics, historical_incidents,
    weather_conditions, time_of_year, security_level
  ) VALUES (
    107, 'Immersive Van Gogh Exhibition', 'Hybrid and Multi-Disciplinary Events', 'Interactive Exhibitions',
    3000, 'London', 'Indoor', 60, 'Mixed', 2, 'Indoor', 'Spring', 'Low'
  ) RETURNING id INTO event_id;

  INSERT INTO event_descriptions (event_id, description, display_order) VALUES
    (event_id, 'State-of-the-art digital art experience featuring Van Gogh masterpieces', 1),
    (event_id, '360-degree immersive journey through iconic paintings', 2);

  INSERT INTO event_schedules (event_id, doors_open, support_act, main_act) VALUES
    (event_id, '10:00', 'N/A', 'Exhibition Hours: 10:00-20:00');

  INSERT INTO contact_information (event_id, phone, email) VALUES
    (event_id, '+44 20 7946 0958', 'info@vangoghexhibition.co.uk');

  INSERT INTO event_details (event_id, type, cost, capacity, security_category) VALUES
    (event_id, 'Art Exhibition', '£35.00', '3,000 people per day', 'CAT C');

  INSERT INTO security_history (event_id, security_performance) VALUES
    (event_id, 'Good overall security with focus on equipment protection and visitor safety in interactive spaces.');

  INSERT INTO previous_events (event_id, description, display_order) VALUES
    (event_id, 'Digital Art Show 2023 - 80,000 total visitors', 1),
    (event_id, 'Interactive Exhibition 2022 - 65,000 total visitors', 2),
    (event_id, 'Multimedia Experience 2021 - 50,000 total visitors', 3);

  INSERT INTO reported_incidents (event_id, incident, display_order) VALUES
    (event_id, '2023: Two cases of equipment misuse', 1),
    (event_id, '2022: Minor technical security breach', 2),
    (event_id, '2021: One case of unauthorized recording', 3);

  INSERT INTO lessons_learned (event_id, lesson, display_order) VALUES
    (event_id, 'Enhanced equipment protection measures', 1),
    (event_id, 'Improved visitor guidance in interactive areas', 2),
    (event_id, 'Better monitoring of recording devices', 3);

END $$;