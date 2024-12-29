/*
  # Add Voice Assistant Features

  1. New Tables
    - voice_assistant_sessions: Tracks user interactions with voice assistant
    - voice_assistant_transcripts: Stores conversation transcripts
    - voice_assistant_feedback: Collects user feedback on interactions

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
    - Set up proper relationships with existing tables

  3. Changes
    - Add voice assistant preferences to user_settings
    - Create indexes for performance optimization
*/

-- Add voice assistant preferences to user_settings if not exists
DO $$ BEGIN
  ALTER TABLE user_settings 
    ADD COLUMN IF NOT EXISTS voice_preferences jsonb 
    DEFAULT '{
      "voice_id": null,
      "speaking_rate": 1.0,
      "pitch": 1.0,
      "volume": 1.0
    }'::jsonb;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Create voice_assistant_sessions table
CREATE TABLE IF NOT EXISTS voice_assistant_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  duration interval,
  status text NOT NULL DEFAULT 'active',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create voice_assistant_transcripts table
CREATE TABLE IF NOT EXISTS voice_assistant_transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES voice_assistant_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  role text NOT NULL,
  sentiment text CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  timestamp timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create voice_assistant_feedback table
CREATE TABLE IF NOT EXISTS voice_assistant_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES voice_assistant_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback text,
  categories text[],
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE voice_assistant_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_assistant_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_assistant_feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can manage their voice assistant sessions"
  ON voice_assistant_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their voice assistant transcripts"
  ON voice_assistant_transcripts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their voice assistant feedback"
  ON voice_assistant_feedback
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at triggers
CREATE TRIGGER update_voice_assistant_sessions_updated_at
  BEFORE UPDATE ON voice_assistant_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_voice_sessions_user_id ON voice_assistant_sessions(user_id);
CREATE INDEX idx_voice_sessions_status ON voice_assistant_sessions(status);
CREATE INDEX idx_voice_transcripts_session_id ON voice_assistant_transcripts(session_id);
CREATE INDEX idx_voice_transcripts_user_id ON voice_assistant_transcripts(user_id);
CREATE INDEX idx_voice_transcripts_timestamp ON voice_assistant_transcripts(timestamp);
CREATE INDEX idx_voice_feedback_session_id ON voice_assistant_feedback(session_id);
CREATE INDEX idx_voice_feedback_user_id ON voice_assistant_feedback(user_id);
CREATE INDEX idx_voice_feedback_rating ON voice_assistant_feedback(rating);

-- Create function to calculate session duration
CREATE OR REPLACE FUNCTION calculate_session_duration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ended_at IS NOT NULL AND OLD.ended_at IS NULL THEN
    NEW.duration = NEW.ended_at - NEW.started_at;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for calculating session duration
CREATE TRIGGER update_session_duration
  BEFORE UPDATE ON voice_assistant_sessions
  FOR EACH ROW
  EXECUTE FUNCTION calculate_session_duration();

-- Create view for voice assistant analytics
CREATE OR REPLACE VIEW voice_assistant_analytics AS
SELECT
  user_id,
  date_trunc('day', started_at) as date,
  COUNT(*) as total_sessions,
  AVG(EXTRACT(EPOCH FROM duration)::numeric)::integer as avg_duration_seconds,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_sessions,
  AVG(
    (SELECT rating FROM voice_assistant_feedback f WHERE f.session_id = s.id)
  )::numeric(3,2) as avg_rating
FROM voice_assistant_sessions s
GROUP BY user_id, date_trunc('day', started_at);

-- Add function to summarize voice assistant usage
CREATE OR REPLACE FUNCTION get_voice_assistant_summary(
  user_uuid uuid,
  start_date timestamptz DEFAULT (now() - interval '30 days'),
  end_date timestamptz DEFAULT now()
)
RETURNS TABLE (
  total_sessions bigint,
  avg_duration_seconds numeric,
  avg_rating numeric,
  most_common_categories text[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT s.id),
    AVG(EXTRACT(EPOCH FROM s.duration))::numeric,
    AVG(f.rating)::numeric,
    array_agg(DISTINCT c.category) FILTER (WHERE c.category IS NOT NULL)
  FROM voice_assistant_sessions s
  LEFT JOIN voice_assistant_feedback f ON s.id = f.session_id
  LEFT JOIN LATERAL unnest(f.categories) AS c(category) ON true
  WHERE s.user_id = user_uuid
  AND s.created_at BETWEEN start_date AND end_date
  GROUP BY s.user_id;
END;
$$ LANGUAGE plpgsql;