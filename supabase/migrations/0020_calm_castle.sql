-- Consolidate and clean up auth-related tables
DO $$ BEGIN
  -- Drop any existing duplicate tables
  DROP TABLE IF EXISTS oauth_accounts CASCADE;
  DROP TABLE IF EXISTS oauth_providers CASCADE;
  
  -- Clean up duplicate columns from user_profiles
  ALTER TABLE user_profiles
    DROP COLUMN IF EXISTS google_id,
    DROP COLUMN IF EXISTS google_email,
    DROP COLUMN IF EXISTS google_picture,
    DROP COLUMN IF EXISTS google_name,
    DROP COLUMN IF EXISTS provider,
    DROP COLUMN IF EXISTS provider_id,
    DROP COLUMN IF EXISTS oauth_provider,
    DROP COLUMN IF EXISTS oauth_id,
    DROP COLUMN IF EXISTS oauth_data;
END $$;

-- Update user_profiles with consolidated auth fields
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS auth_provider text,
  ADD COLUMN IF NOT EXISTS auth_provider_id text,
  ADD COLUMN IF NOT EXISTS auth_metadata jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_sign_in timestamptz;

-- Add constraints and indexes
ALTER TABLE user_profiles
  DROP CONSTRAINT IF EXISTS unique_auth_provider;

ALTER TABLE user_profiles
  ADD CONSTRAINT unique_auth_provider UNIQUE (auth_provider, auth_provider_id) 
  WHERE auth_provider IS NOT NULL AND auth_provider_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_profiles_auth_provider 
  ON user_profiles(auth_provider) 
  WHERE auth_provider IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_profiles_email_verified 
  ON user_profiles(email_verified) 
  WHERE email_verified = true;

-- Create auth_sessions table for session management
CREATE TABLE IF NOT EXISTS auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  refresh_token text,
  device_info jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create auth_events table for activity logging
CREATE TABLE IF NOT EXISTS auth_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  event_type text NOT NULL,
  provider text,
  ip_address text,
  user_agent text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own sessions"
  ON auth_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own events"
  ON auth_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_auth_sessions_user_id ON auth_sessions(user_id);
CREATE INDEX idx_auth_sessions_expires_at ON auth_sessions(expires_at);
CREATE INDEX idx_auth_events_user_id ON auth_events(user_id);
CREATE INDEX idx_auth_events_created_at ON auth_events(created_at);

-- Create function to handle auth events
CREATE OR REPLACE FUNCTION handle_auth_event()
RETURNS trigger AS $$
BEGIN
  INSERT INTO auth_events (
    user_id,
    event_type,
    provider,
    ip_address,
    user_agent,
    metadata
  ) VALUES (
    NEW.id,
    TG_ARGV[0],
    COALESCE(NEW.raw_user_meta_data->>'provider', 'email'),
    current_setting('request.headers')::jsonb->>'x-forwarded-for',
    current_setting('request.headers')::jsonb->>'user-agent',
    NEW.raw_user_meta_data
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for auth event logging
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_event('user_created');

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_event('user_updated');

-- Create view for auth analytics
CREATE OR REPLACE VIEW auth_analytics AS
SELECT
  COALESCE(auth_provider, 'email') as provider,
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE email_verified) as verified_users,
  COUNT(*) FILTER (WHERE last_sign_in > now() - interval '30 days') as active_users_30d,
  MAX(last_sign_in) as last_sign_in
FROM user_profiles
GROUP BY auth_provider;