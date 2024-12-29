-- Create auth_settings table for managing authentication configuration
CREATE TABLE IF NOT EXISTS auth_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  is_enabled boolean DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create auth_sessions table for tracking user sessions
CREATE TABLE IF NOT EXISTS auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  device_info jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  last_active timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create auth_activity_logs table for tracking authentication events
CREATE TABLE IF NOT EXISTS auth_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  event_type text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE auth_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own sessions"
  ON auth_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own activity logs"
  ON auth_activity_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX auth_sessions_user_id_idx ON auth_sessions(user_id);
CREATE INDEX auth_sessions_last_active_idx ON auth_sessions(last_active);
CREATE INDEX auth_activity_logs_user_id_idx ON auth_activity_logs(user_id);
CREATE INDEX auth_activity_logs_event_type_idx ON auth_activity_logs(event_type);
CREATE INDEX auth_activity_logs_created_at_idx ON auth_activity_logs(created_at);

-- Create updated_at triggers
CREATE TRIGGER update_auth_settings_updated_at
  BEFORE UPDATE ON auth_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auth_sessions_updated_at
  BEFORE UPDATE ON auth_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to log auth activity
CREATE OR REPLACE FUNCTION log_auth_activity()
RETURNS trigger AS $$
BEGIN
  INSERT INTO auth_activity_logs (
    user_id,
    event_type,
    metadata,
    ip_address
  ) VALUES (
    NEW.id,
    TG_ARGV[0],
    jsonb_build_object(
      'email', NEW.email,
      'provider', COALESCE(NEW.raw_user_meta_data->>'provider', 'email')
    ),
    current_setting('request.headers')::jsonb->>'x-forwarded-for'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for auth activity logging
DROP TRIGGER IF EXISTS on_auth_user_created_log ON auth.users;
CREATE TRIGGER on_auth_user_created_log
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION log_auth_activity('user_created');

DROP TRIGGER IF EXISTS on_auth_user_updated_log ON auth.users;
CREATE TRIGGER on_auth_user_updated_log
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION log_auth_activity('user_updated');

-- Create view for auth activity analytics
CREATE OR REPLACE VIEW auth_activity_analytics AS
SELECT
  event_type,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_id) as unique_users,
  MAX(created_at) as last_occurrence
FROM auth_activity_logs
WHERE created_at > now() - interval '30 days'
GROUP BY event_type;

-- Insert default auth settings
INSERT INTO auth_settings (provider, config) VALUES
('email', '{"require_email_confirmation": true}'::jsonb),
('google', '{"enabled": true}'::jsonb);