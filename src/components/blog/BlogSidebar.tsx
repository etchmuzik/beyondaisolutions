import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogCategories } from '../../hooks/useBlogCategories';
import { useRecentPosts } from '../../hooks/useRecentPosts';

export function BlogSidebar() {
  const { categories } = useBlogCategories();
  const { posts: recentPosts } = useRecentPosts();

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
          <input
            type="search"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/blog/category/${category.slug}`}
              className="flex items-center justify-between text-foreground/70 hover:text-foreground"
            >
              <span>{category.name}</span>
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex gap-4 group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-foreground group-hover:text-primary font-medium line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-foreground/70">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}