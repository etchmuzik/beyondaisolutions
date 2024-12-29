/*
  # Create calls table

  1. New Tables
    - `calls`
      - `id` (uuid, primary key)
      - `contact_name` (text)
      - `company` (text)
      - `status` (enum)
      - `timestamp` (timestamptz)
      - `duration` (integer)
      - `assigned_to` (uuid, references auth.users)
      - `notes` (text)
      - `transcription` (text)
      - `sentiment` (enum)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create enum types
CREATE TYPE call_status AS ENUM ('completed', 'scheduled', 'failed');
CREATE TYPE sentiment_type AS ENUM ('positive', 'neutral', 'negative');

-- Create calls table
CREATE TABLE IF NOT EXISTS calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  company text NOT NULL,
  status call_status NOT NULL DEFAULT 'scheduled',
  timestamp timestamptz NOT NULL DEFAULT now(),
  duration integer NOT NULL DEFAULT 0,
  assigned_to uuid REFERENCES auth.users NOT NULL,
  notes text,
  transcription text,
  sentiment sentiment_type,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own calls"
  ON calls
  FOR SELECT
  TO authenticated
  USING (auth.uid() = assigned_to);

CREATE POLICY "Users can insert their own calls"
  ON calls
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = assigned_to);

CREATE POLICY "Users can update their own calls"
  ON calls
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = assigned_to)
  WITH CHECK (auth.uid() = assigned_to);

-- Create indexes
CREATE INDEX calls_assigned_to_idx ON calls(assigned_to);
CREATE INDEX calls_timestamp_idx ON calls(timestamp);
CREATE INDEX calls_status_idx ON calls(status);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_calls_updated_at
  BEFORE UPDATE ON calls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();