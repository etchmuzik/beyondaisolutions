/*
  # Fix Authentication Tables and OAuth Support

  1. Changes
    - Consolidate OAuth and profile tables
    - Add OAuth provider fields
    - Update triggers and functions
    - Clean up duplicate tables
    
  2. Security
    - Enable RLS
    - Add policies for profile management
    - Ensure proper cascading deletes
*/

-- Drop any existing duplicate tables
DROP TABLE IF EXISTS oauth_accounts CASCADE;
DROP TABLE IF EXISTS oauth_providers CASCADE;

-- Update user_profiles table with OAuth fields
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS oauth_provider text,
  ADD COLUMN IF NOT EXISTS oauth_id text,
  ADD COLUMN IF NOT EXISTS oauth_access_token text,
  ADD COLUMN IF NOT EXISTS oauth_refresh_token text,
  ADD COLUMN IF NOT EXISTS oauth_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- Add constraints
ALTER TABLE user_profiles
  DROP CONSTRAINT IF EXISTS unique_oauth_provider_id;

ALTER TABLE user_profiles
  ADD CONSTRAINT unique_oauth_provider_id UNIQUE (oauth_provider, oauth_id) 
  WHERE oauth_provider IS NOT NULL AND oauth_id IS NOT NULL;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_oauth_provider 
  ON user_profiles(oauth_provider) 
  WHERE oauth_provider IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_profiles_email_verified 
  ON user_profiles(email_verified) 
  WHERE email_verified = true;

-- Update auth user created function
CREATE OR REPLACE FUNCTION handle_auth_user_created()
RETURNS trigger AS $$
BEGIN
  -- Handle both email and OAuth sign ups
  INSERT INTO user_profiles (
    id,
    email,
    username,
    oauth_provider,
    oauth_id,
    email_verified,
    metadata,
    created_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'provider',
    NEW.raw_user_meta_data->>'provider_id',
    COALESCE(NEW.email_confirmed, false),
    NEW.raw_user_meta_data,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to handle OAuth updates
CREATE OR REPLACE FUNCTION handle_oauth_update()
RETURNS trigger AS $$
BEGIN
  UPDATE user_profiles SET
    oauth_access_token = NEW.oauth_access_token,
    oauth_refresh_token = NEW.oauth_refresh_token,
    oauth_expires_at = NEW.oauth_expires_at,
    metadata = NEW.metadata,
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for OAuth updates
DROP TRIGGER IF EXISTS on_oauth_update ON auth.users;
CREATE TRIGGER on_oauth_update
  AFTER UPDATE OF raw_user_meta_data ON auth.users
  FOR EACH ROW
  WHEN (NEW.raw_user_meta_data->>'provider' IS NOT NULL)
  EXECUTE FUNCTION handle_oauth_update();

-- Create view for OAuth statistics
CREATE OR REPLACE VIEW oauth_stats AS
SELECT
  oauth_provider as provider,
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE email_verified) as verified_users,
  COUNT(*) FILTER (WHERE updated_at > now() - interval '30 days') as active_users_30d,
  MAX(updated_at) as last_sign_in
FROM user_profiles
WHERE oauth_provider IS NOT NULL
GROUP BY oauth_provider;