import { PageLayout } from '../components/layout/PageLayout';
import { BlogHeader } from '../components/blog/BlogHeader';
import { BlogGrid } from '../components/blog/BlogGrid';
import { BlogSidebar } from '../components/blog/BlogSidebar';
import { BlogSearch } from '../components/blog/BlogSearch';

export function Blog() {
  return (
    <PageLayout>
      <BlogHeader />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <BlogSearch className="mb-8" />
          <BlogGrid />
        </div>
        <div className="lg:col-span-4">
          <BlogSidebar />
        </div>
      </div>
    </PageLayout>
  );
}