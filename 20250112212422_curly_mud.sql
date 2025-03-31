/*
  # Add target attractiveness column

  1. Changes
    - Add `target_attractiveness` column to events table
    - Create index for efficient querying
    - Add function to update target attractiveness
*/

-- Add target attractiveness column
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS target_attractiveness TEXT;

-- Create index for the new column
CREATE INDEX IF NOT EXISTS idx_events_target_attractiveness 
ON events(target_attractiveness);

-- Add a function to update target attractiveness
CREATE OR REPLACE FUNCTION update_event_target_attractiveness(
  p_event_id BIGINT,
  p_target_attractiveness TEXT
) RETURNS void AS $$
BEGIN
  UPDATE events
  SET 
    target_attractiveness = p_target_attractiveness,
    updated_at = now()
  WHERE id = p_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;