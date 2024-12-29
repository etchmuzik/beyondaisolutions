/*
  # Add Google Authentication Metadata

  1. Changes
    - Add metadata fields to oauth_providers table
    - Create helper functions for Google auth
    - Add additional indexes for performance
  
  2. Security
    - Maintain existing RLS policies
    - Add validation checks
*/

-- Add metadata fields to oauth_providers
ALTER TABLE oauth_providers
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_sign_in timestamptz;

-- Create function to handle Google auth user creation
CREATE OR REPLACE FUNCTION handle_google_auth_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (
    id,
    username,
    google_id,
    google_email,
    google_picture,
    google_name,
    created_at
  )
  VALUES (
    NEW.user_id,
    split_part(NEW.metadata->>'email', '@', 1),
    NEW.provider_user_id,
    NEW.metadata->>'email',
    NEW.metadata->>'picture',
    NEW.metadata->>'name',
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    google_id = EXCLUDED.google_id,
    google_email = EXCLUDED.google_email,
    google_picture = EXCLUDED.google_picture,
    google_name = EXCLUDED.google_name,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for Google auth
CREATE TRIGGER on_google_auth_user
  AFTER INSERT OR UPDATE ON oauth_providers
  FOR EACH ROW
  WHEN (NEW.provider = 'google')
  EXECUTE FUNCTION handle_google_auth_user();

-- Add additional indexes
CREATE INDEX IF NOT EXISTS oauth_providers_email_verified_idx 
  ON oauth_providers(email_verified) 
  WHERE provider = 'google';

CREATE INDEX IF NOT EXISTS oauth_providers_last_sign_in_idx 
  ON oauth_providers(last_sign_in);

-- Create view for Google auth statistics
CREATE OR REPLACE VIEW google_auth_stats AS
SELECT
  COUNT(*) as total_google_users,
  COUNT(*) FILTER (WHERE email_verified) as verified_users,
  COUNT(*) FILTER (WHERE last_sign_in > now() - interval '30 days') as active_users_30d,
  MAX(last_sign_in) as last_google_sign_in
FROM oauth_providers
WHERE provider = 'google';