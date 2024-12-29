import type { BlogCategory } from '../../../types/blog';

interface CategoryBadgeProps {
  category: BlogCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
      {category.name}
      <span className="ml-2 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
        {category.count}
      </span>
    </div>
  );
}