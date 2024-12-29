import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types/blog';

export function useRecentPosts(limit = 5) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            author:user_id (*)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(limit);

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recent posts');
      } finally {
        setLoading(false);
      }
    }

    fetchRecentPosts();
  }, [limit]);

  return { posts, loading, error };
}