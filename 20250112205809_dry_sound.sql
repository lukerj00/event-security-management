/*
  # Add AI Assessment Columns

  1. Changes
    - Add columns to events table:
      - `ai_main_type` - Stores the AI-classified main event type
      - `ai_sub_type` - Stores the AI-classified event subtype
      - `evil_done_assessment` - Stores the EVIL DONE risk assessment result

  2. Security
    - Inherit existing RLS policies from events table
*/

-- Add new columns to the events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS ai_main_type TEXT,
ADD COLUMN IF NOT EXISTS ai_sub_type TEXT,
ADD COLUMN IF NOT EXISTS evil_done_assessment TEXT;

-- Create indexes for the new columns
CREATE INDEX IF NOT EXISTS idx_events_ai_types 
ON events(ai_main_type, ai_sub_type);

CREATE INDEX IF NOT EXISTS idx_events_evil_done 
ON events(evil_done_assessment);

-- Add a function to update AI assessments
CREATE OR REPLACE FUNCTION update_event_assessment(
  p_event_id BIGINT,
  p_main_type TEXT,
  p_sub_type TEXT,
  p_evil_done TEXT
) RETURNS void AS $$
BEGIN
  UPDATE events
  SET 
    ai_main_type = p_main_type,
    ai_sub_type = p_sub_type,
    evil_done_assessment = p_evil_done,
    updated_at = now()
  WHERE id = p_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;