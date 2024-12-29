/*
  # Add Google Authentication Support

  1. Changes
    - Create oauth_accounts table for storing OAuth provider data
    - Add Google-specific fields to profiles table
    - Add necessary indexes and RLS policies
  
  2. Security
    - Enable RLS on new table
    - Add policies for user data protection
    - Create indexes for performance
*/

-- Add Google-specific fields to profiles table if not exists
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS google_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS google_email text,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;

-- Create oauth_accounts table
CREATE TABLE IF NOT EXISTS oauth_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  provider text NOT NULL,
  provider_id text NOT NULL,
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider, provider_id)
);

-- Enable RLS
ALTER TABLE oauth_accounts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own OAuth accounts"
  ON oauth_accounts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own OAuth accounts"
  ON oauth_accounts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX oauth_accounts_user_id_idx ON oauth_accounts(user_id);
CREATE INDEX oauth_accounts_provider_idx ON oauth_accounts(provider);
CREATE INDEX profiles_google_id_idx ON profiles(google_id);
CREATE INDEX profiles_google_email_idx ON profiles(google_email);

-- Create updated_at trigger
CREATE TRIGGER update_oauth_accounts_updated_at
  BEFORE UPDATE ON oauth_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for OAuth statistics
CREATE OR REPLACE VIEW oauth_provider_stats AS
SELECT
  provider,
  COUNT(*) as total_accounts,
  COUNT(DISTINCT user_id) as unique_users,
  MAX(created_at) as last_connection
FROM oauth_accounts
GROUP BY provider;