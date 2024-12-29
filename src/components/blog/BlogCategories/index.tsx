import { Link } from 'react-router-dom';
import { useBlogCategories } from '../../../hooks/useBlogCategories';
import { CategoryBadge } from './CategoryBadge';

export function BlogCategories() {
  const { categories, loading } = useBlogCategories();

  if (loading) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link key={category.id} to={`/blog/category/${category.slug}`}>
          <CategoryBadge category={category} />
        </Link>
      ))}
    </div>
  );
}