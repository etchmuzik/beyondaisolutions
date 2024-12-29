/*
  # Call Management System

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `call_schedules`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `contact_id` (uuid, references contacts)
      - `scheduled_at` (timestamptz)
      - `duration` (interval)
      - `status` (enum)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create call_status enum if not exists
DO $$ BEGIN
  CREATE TYPE call_schedule_status AS ENUM ('pending', 'completed', 'cancelled', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  company text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create call_schedules table
CREATE TABLE IF NOT EXISTS call_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  contact_id uuid REFERENCES contacts ON DELETE CASCADE NOT NULL,
  scheduled_at timestamptz NOT NULL,
  duration interval NOT NULL DEFAULT '30 minutes'::interval,
  status call_schedule_status NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts
CREATE POLICY "Users can manage their own contacts"
  ON contacts
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for call_schedules
CREATE POLICY "Users can manage their own call schedules"
  ON call_schedules
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX contacts_user_id_idx ON contacts(user_id);
CREATE INDEX call_schedules_user_id_idx ON call_schedules(user_id);
CREATE INDEX call_schedules_contact_id_idx ON call_schedules(contact_id);
CREATE INDEX call_schedules_scheduled_at_idx ON call_schedules(scheduled_at);

-- Add triggers for updated_at
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_call_schedules_updated_at
  BEFORE UPDATE ON call_schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();