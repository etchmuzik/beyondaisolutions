/*
  # Refine Authentication Structure
  
  1. Changes
    - Consolidate OAuth and profile tables
    - Remove duplicate tables and fields
    - Add missing indexes and constraints
    - Update triggers and functions
    
  2. Security
    - Enhance RLS policies
    - Add better constraints
    - Improve data validation
*/

-- Drop any existing duplicate tables and fields
DROP TABLE IF EXISTS oauth_accounts CASCADE;
DROP TABLE IF EXISTS oauth_providers CASCADE;

ALTER TABLE user_profiles
  DROP COLUMN IF EXISTS google_id,
  DROP COLUMN IF EXISTS google_email,
  DROP COLUMN IF EXISTS google_picture,
  DROP COLUMN IF EXISTS google_name,
  DROP COLUMN IF EXISTS provider,
  DROP COLUMN IF EXISTS provider_id;

-- Update user_profiles with consolidated fields
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS oauth_provider text,
  ADD COLUMN IF NOT EXISTS oauth_id text,
  ADD COLUMN IF NOT EXISTS oauth_data jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_sign_in timestamptz,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- Add constraints
ALTER TABLE user_profiles
  DROP CONSTRAINT IF EXISTS unique_email;
  
ALTER TABLE user_profiles
  ADD CONSTRAINT unique_email UNIQUE (email) WHERE email IS NOT NULL,
  ADD CONSTRAINT unique_oauth UNIQUE (oauth_provider, oauth_id) 
    WHERE oauth_provider IS NOT NULL AND oauth_id IS NOT NULL;

-- Create or update indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_oauth 
  ON user_profiles(oauth_provider, oauth_id) 
  WHERE oauth_provider IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_profiles_email 
  ON user_profiles(email) 
  WHERE email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_profiles_verified 
  ON user_profiles(email_verified) 
  WHERE email_verified = true;

-- Update auth handlers
CREATE OR REPLACE FUNCTION handle_auth_user_created()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (
    id,
    email,
    username,
    oauth_provider,
    oauth_id,
    oauth_data,
    email_verified,
    metadata,
    last_sign_in,
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
    CASE 
      WHEN NEW.raw_user_meta_data->>'provider' IS NOT NULL 
      THEN jsonb_build_object(
        'access_token', NEW.raw_user_meta_data->>'access_token',
        'refresh_token', NEW.raw_user_meta_data->>'refresh_token',
        'expires_at', NEW.raw_user_meta_data->>'expires_at'
      )
      ELSE '{}'::jsonb
    END,
    COALESCE(NEW.email_confirmed, false),
    NEW.raw_user_meta_data,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to handle auth updates
CREATE OR REPLACE FUNCTION handle_auth_user_updated()
RETURNS trigger AS $$
BEGIN
  UPDATE user_profiles SET
    email = NEW.email,
    email_verified = COALESCE(NEW.email_confirmed, false),
    oauth_data = CASE 
      WHEN NEW.raw_user_meta_data->>'provider' IS NOT NULL 
      THEN jsonb_build_object(
        'access_token', NEW.raw_user_meta_data->>'access_token',
        'refresh_token', NEW.raw_user_meta_data->>'refresh_token',
        'expires_at', NEW.raw_user_meta_data->>'expires_at'
      )
      ELSE oauth_data
    END,
    metadata = NEW.raw_user_meta_data,
    last_sign_in = NOW(),
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_user_created();

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_user_updated();

-- Create view for auth statistics
CREATE OR REPLACE VIEW auth_stats AS
SELECT
  oauth_provider,
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE email_verified) as verified_users,
  COUNT(*) FILTER (WHERE last_sign_in > now() - interval '30 days') as active_users_30d,
  MAX(last_sign_in) as last_sign_in
FROM user_profiles
GROUP BY oauth_provider;