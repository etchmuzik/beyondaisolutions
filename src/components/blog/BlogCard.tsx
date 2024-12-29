import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
      <Link to={`/blog/${post.slug}`}>
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-foreground/70 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author}
          </span>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold text-foreground hover:text-primary mb-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-foreground/70 mb-4">{post.excerpt}</p>
        <div className="flex gap-2">
          {post.categories.map((category) => (
            <Link
              key={category}
              to={`/blog/category/${category.toLowerCase()}`}
              className="text-sm text-primary hover:text-primary/80"
            >
              #{category}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}