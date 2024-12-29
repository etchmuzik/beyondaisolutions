/*
  # Add Google Authentication Support

  1. Changes
    - Add Google-specific fields to user_profiles table
    - Create oauth_providers table for provider metadata
    - Add necessary indexes and RLS policies
  
  2. Security
    - Enable RLS on new tables
    - Add policies for user data protection
*/

-- Add Google-specific fields to user_profiles
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS google_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS google_email text,
  ADD COLUMN IF NOT EXISTS google_picture text,
  ADD COLUMN IF NOT EXISTS google_name text;

-- Create oauth_providers table
CREATE TABLE IF NOT EXISTS oauth_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  provider text NOT NULL,
  provider_user_id text NOT NULL,
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider, provider_user_id)
);

-- Enable RLS
ALTER TABLE oauth_providers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own OAuth providers"
  ON oauth_providers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own OAuth providers"
  ON oauth_providers FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX oauth_providers_user_id_idx ON oauth_providers(user_id);
CREATE INDEX oauth_providers_provider_idx ON oauth_providers(provider);
CREATE INDEX user_profiles_google_id_idx ON user_profiles(google_id);

-- Create updated_at trigger
CREATE TRIGGER update_oauth_providers_updated_at
  BEFORE UPDATE ON oauth_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();