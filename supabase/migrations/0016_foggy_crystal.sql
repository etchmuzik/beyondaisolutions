/*
  # Fix Authentication Tables

  1. Changes
    - Drop duplicate OAuth tables
    - Consolidate user profile fields
    - Add proper indexes and constraints
    - Update RLS policies
    
  2. Security
    - Enable RLS
    - Add policies for profile management
    - Ensure proper cascading deletes
*/

-- Drop duplicate tables if they exist
DROP TABLE IF EXISTS oauth_accounts CASCADE;
DROP TABLE IF EXISTS oauth_providers CASCADE;

-- Update user_profiles table
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS provider text,
  ADD COLUMN IF NOT EXISTS provider_id text,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS last_sign_in timestamptz;

-- Add constraints
ALTER TABLE user_profiles
  ADD CONSTRAINT unique_username UNIQUE (username),
  ADD CONSTRAINT unique_provider_id UNIQUE (provider, provider_id) 
  WHERE provider IS NOT NULL AND provider_id IS NOT NULL;

-- Create indexes
CREATE INDEX IF NOT EXISTS user_profiles_provider_idx ON user_profiles(provider) 
  WHERE provider IS NOT NULL;
CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON user_profiles(email) 
  WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS user_profiles_last_sign_in_idx ON user_profiles(last_sign_in) 
  WHERE last_sign_in IS NOT NULL;

-- Update RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create function to handle auth user creation
CREATE OR REPLACE FUNCTION handle_auth_user_created()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (id, email, username, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    split_part(NEW.email, '@', 1),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new auth users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_user_created();

-- Create view for auth statistics
CREATE OR REPLACE VIEW auth_user_stats AS
SELECT
  provider,
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE last_sign_in > now() - interval '30 days') as active_users_30d,
  MAX(last_sign_in) as last_sign_in
FROM user_profiles
WHERE provider IS NOT NULL
GROUP BY provider;