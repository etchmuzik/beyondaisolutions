/*
  # Blog System Schema

  1. New Tables
    - blog_posts
    - blog_categories
    - blog_tags
    - blog_post_categories
    - blog_post_tags
    - blog_comments

  2. Security
    - Enable RLS on all tables
    - Add policies for public reading and authenticated user actions
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  image text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  user_id uuid REFERENCES auth.users NOT NULL,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id uuid REFERENCES blog_posts ON DELETE CASCADE,
  category_id uuid REFERENCES blog_categories ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id uuid REFERENCES blog_posts ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Blog Categories (public read, admin write)
CREATE POLICY "Blog categories are viewable by everyone"
  ON blog_categories FOR SELECT
  TO public
  USING (true);

-- Blog Tags (public read, admin write)
CREATE POLICY "Blog tags are viewable by everyone"
  ON blog_tags FOR SELECT
  TO public
  USING (true);

-- Blog Posts (published posts are public, drafts visible to authors)
CREATE POLICY "Published posts are viewable by everyone"
  ON blog_posts FOR SELECT
  TO public
  USING (status = 'published' AND published_at <= now());

CREATE POLICY "Authors can view all their posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Blog Comments (public read for approved, authors can manage their own)
CREATE POLICY "Approved comments are viewable by everyone"
  ON blog_comments FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Users can create comments"
  ON blog_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own comments"
  ON blog_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX blog_posts_user_id_idx ON blog_posts(user_id);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX blog_comments_post_id_idx ON blog_comments(post_id);
CREATE INDEX blog_comments_user_id_idx ON blog_comments(user_id);
CREATE INDEX blog_comments_status_idx ON blog_comments(status);

-- Create updated_at triggers
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
  BEFORE UPDATE ON blog_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_comments_updated_at
  BEFORE UPDATE ON blog_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for post statistics
CREATE OR REPLACE VIEW blog_post_stats AS
SELECT 
  p.id as post_id,
  p.title,
  p.slug,
  COUNT(DISTINCT c.id) as comment_count,
  COUNT(DISTINCT pc.category_id) as category_count,
  COUNT(DISTINCT pt.tag_id) as tag_count,
  p.published_at,
  p.created_at
FROM blog_posts p
LEFT JOIN blog_comments c ON p.id = c.post_id AND c.status = 'approved'
LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
LEFT JOIN blog_post_tags pt ON p.id = pt.post_id
WHERE p.status = 'published'
GROUP BY p.id, p.title, p.slug, p.published_at, p.created_at;