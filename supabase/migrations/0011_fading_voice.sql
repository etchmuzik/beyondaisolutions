/*
  # Additional Tables for Enhanced Functionality

  1. New Tables
    - `notifications` - System-wide notification system
    - `user_achievements` - Track user milestones and badges
    - `testimonials` - Store client testimonials
    - `company_locations` - Track office locations
    - `faq` - Frequently asked questions

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
    - Add indexes for performance

  3. Changes
    - Add notification tracking
    - Add achievement system
    - Add testimonial management
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  read boolean DEFAULT false,
  data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  achievement_data jsonb DEFAULT '{}'::jsonb,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_title text,
  company_name text,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create company_locations table
CREATE TABLE IF NOT EXISTS company_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  postal_code text,
  latitude numeric,
  longitude numeric,
  type text NOT NULL CHECK (type IN ('headquarters', 'office', 'remote-hub')),
  contact_email text,
  contact_phone text,
  timezone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create faq table
CREATE TABLE IF NOT EXISTS faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  order_index integer DEFAULT 0,
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- User Achievements
CREATE POLICY "Users can view their own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Testimonials
CREATE POLICY "Approved testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  TO public
  USING (status = 'approved');

-- Company Locations
CREATE POLICY "Company locations are viewable by everyone"
  ON company_locations FOR SELECT
  TO public
  USING (true);

-- FAQ
CREATE POLICY "Published FAQs are viewable by everyone"
  ON faq FOR SELECT
  TO public
  USING (status = 'published');

-- Create indexes
CREATE INDEX notifications_user_id_idx ON notifications(user_id);
CREATE INDEX notifications_read_idx ON notifications(read);
CREATE INDEX user_achievements_user_id_idx ON user_achievements(user_id);
CREATE INDEX user_achievements_type_idx ON user_achievements(achievement_type);
CREATE INDEX testimonials_status_idx ON testimonials(status);
CREATE INDEX testimonials_featured_idx ON testimonials(featured);
CREATE INDEX company_locations_type_idx ON company_locations(type);
CREATE INDEX faq_category_idx ON faq(category);
CREATE INDEX faq_status_idx ON faq(status);
CREATE INDEX faq_order_idx ON faq(order_index);

-- Create updated_at triggers
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_locations_updated_at
  BEFORE UPDATE ON company_locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_updated_at
  BEFORE UPDATE ON faq
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create views
CREATE OR REPLACE VIEW testimonial_stats AS
SELECT
  status,
  COUNT(*) as total,
  AVG(rating)::numeric(3,2) as avg_rating,
  COUNT(*) FILTER (WHERE featured) as featured_count
FROM testimonials
GROUP BY status;

CREATE OR REPLACE VIEW location_stats AS
SELECT
  type,
  COUNT(*) as total_locations,
  array_agg(DISTINCT country) as countries,
  COUNT(DISTINCT country) as country_count
FROM company_locations
GROUP BY type;