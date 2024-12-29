import { BlogCard } from './BlogCard';
import { useBlogPosts } from '../../hooks/useBlogPosts';

export function BlogGrid() {
  const { posts, loading } = useBlogPosts();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}