/*
  # Analytics and Reporting Schema

  1. New Tables
    - `call_analytics`
      - Per-call analytics data
      - Metrics like duration, sentiment, outcome
    - `user_metrics`
      - Aggregated user performance metrics
      - Daily/weekly/monthly stats
    - `conversion_tracking`
      - Track call outcomes and conversions
    - `activity_logs`
      - System-wide activity tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
    - Create indexes for performance
*/

-- Create call_analytics table
CREATE TABLE IF NOT EXISTS call_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id uuid REFERENCES call_schedules ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  duration interval NOT NULL,
  sentiment_score float CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  keywords text[],
  transcription_summary text,
  ai_suggestions text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create user_metrics table
CREATE TABLE IF NOT EXISTS user_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  total_calls integer NOT NULL DEFAULT 0,
  total_duration interval NOT NULL DEFAULT '0'::interval,
  successful_calls integer NOT NULL DEFAULT 0,
  average_sentiment float,
  conversion_rate float,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

-- Create conversion_tracking table
CREATE TABLE IF NOT EXISTS conversion_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id uuid REFERENCES call_schedules ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  conversion_type text NOT NULL,
  value decimal(10,2),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  description text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE call_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for call_analytics
CREATE POLICY "Users can view their own call analytics"
  ON call_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for user_metrics
CREATE POLICY "Users can view their own metrics"
  ON user_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for conversion_tracking
CREATE POLICY "Users can manage their own conversion data"
  ON conversion_tracking
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for activity_logs
CREATE POLICY "Users can view their own activity logs"
  ON activity_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX call_analytics_call_id_idx ON call_analytics(call_id);
CREATE INDEX call_analytics_user_id_idx ON call_analytics(user_id);
CREATE INDEX user_metrics_user_id_date_idx ON user_metrics(user_id, date);
CREATE INDEX conversion_tracking_call_id_idx ON conversion_tracking(call_id);
CREATE INDEX conversion_tracking_user_id_idx ON conversion_tracking(user_id);
CREATE INDEX activity_logs_user_id_idx ON activity_logs(user_id);
CREATE INDEX activity_logs_created_at_idx ON activity_logs(created_at);

-- Add triggers for updated_at
CREATE TRIGGER update_call_analytics_updated_at
  BEFORE UPDATE ON call_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_metrics_updated_at
  BEFORE UPDATE ON user_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversion_tracking_updated_at
  BEFORE UPDATE ON conversion_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();