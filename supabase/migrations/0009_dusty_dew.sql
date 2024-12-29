/*
  # Careers System Schema

  1. New Tables
    - job_openings
    - job_applications
    - team_members
    - departments

  2. Security
    - Enable RLS on all tables
    - Add policies for public reading and authenticated user actions
*/

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create job_openings table
CREATE TABLE IF NOT EXISTS job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department_id uuid REFERENCES departments NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  description text NOT NULL,
  requirements text[] NOT NULL,
  responsibilities text[] NOT NULL,
  benefits text[],
  salary_range jsonb,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES job_openings ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  resume_url text NOT NULL,
  cover_letter text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interviewed', 'accepted', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department_id uuid REFERENCES departments,
  bio text,
  image text,
  social jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Departments (public read)
CREATE POLICY "Departments are viewable by everyone"
  ON departments FOR SELECT
  TO public
  USING (true);

-- Job Openings (public read for open positions)
CREATE POLICY "Open positions are viewable by everyone"
  ON job_openings FOR SELECT
  TO public
  USING (status = 'open');

-- Job Applications (users can manage their own)
CREATE POLICY "Users can create applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Team Members (public read)
CREATE POLICY "Team members are viewable by everyone"
  ON team_members FOR SELECT
  TO public
  USING (true);

-- Create indexes
CREATE INDEX job_openings_department_id_idx ON job_openings(department_id);
CREATE INDEX job_openings_status_idx ON job_openings(status);
CREATE INDEX job_applications_job_id_idx ON job_applications(job_id);
CREATE INDEX job_applications_user_id_idx ON job_applications(user_id);
CREATE INDEX job_applications_status_idx ON job_applications(status);
CREATE INDEX team_members_department_id_idx ON team_members(department_id);

-- Create updated_at triggers
CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON departments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_openings_updated_at
  BEFORE UPDATE ON job_openings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for job opening statistics
CREATE OR REPLACE VIEW job_opening_stats AS
SELECT 
  j.id as job_id,
  j.title,
  d.name as department,
  j.location,
  j.type,
  COUNT(a.id) as total_applications,
  COUNT(CASE WHEN a.status = 'pending' THEN 1 END) as pending_applications,
  COUNT(CASE WHEN a.status = 'interviewed' THEN 1 END) as interviewed_applications,
  j.created_at,
  j.updated_at
FROM job_openings j
LEFT JOIN departments d ON j.department_id = d.id
LEFT JOIN job_applications a ON j.id = a.job_id
WHERE j.status = 'open'
GROUP BY j.id, j.title, d.name, j.location, j.type, j.created_at, j.updated_at;