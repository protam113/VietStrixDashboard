'use client';

import { useState } from 'react';
import { BlogCard } from './BlogCard';
import { BlogPopularCard } from './BlogPopularCard';
import CategoryCard from './BlogCategory';
import { BlogList } from '@/lib/data/blogLib';
import NoResultsFound from '@/components/design/NoResultsFound';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshButton } from '@/components/button/RefreshButton';
import { CustomPagination } from '@/components/design/pagination';
import { DraftBlogCard } from './DraftBlogCard';

export enum BlogStatus {
  Show = 'show',
  Hide = 'hide',
  Popular = 'popular',
  Draft = 'draft',
}

export default function BlogListData() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    category: selectedCategory ?? undefined,
    limit: pageSize,
  };

  // Lấy danh sách blogs
  const { blogs, isLoading, isError, pagination } = BlogList(
    currentPage,
    params,
    refreshKey
  );
  const { blogs: popularBlogs } = BlogList(
    1,
    { limit: 100, status: 'popular' },
    0
  );

  const { blogs: draftBlogs } = BlogList(1, { limit: 100, status: 'draft' }, 0);

  // Lấy danh sách categories

  if (isLoading || isError) return <p>Loading...</p>;

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Draft Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {draftBlogs.map((blog) => (
              <DraftBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>

        {/* Popular Blogs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Popular Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {popularBlogs && popularBlogs.length > 0 ? (
              popularBlogs.map((post) => (
                <BlogPopularCard key={post._id} blog={post} />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center py-24">
                <NoResultsFound />
              </div>
            )}
          </div>
        </section>

        {/* Category Cards */}
        <div className="border-b border-gray-200 mb-8">
          <CategoryCard onCategorySelect={setSelectedCategory} />
        </div>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filter status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Select
              onValueChange={(value) => setSelectedStatus(value)}
              value={selectedStatus}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value={BlogStatus.Show}>Show</SelectItem>
                <SelectItem value={BlogStatus.Hide}>Hide</SelectItem>
                <SelectItem value={BlogStatus.Popular}>Popular</SelectItem>
                <SelectItem value={BlogStatus.Draft}>Draft</SelectItem>
              </SelectContent>
            </Select>

            <RefreshButton onClick={handleRefresh} />
          </div>

          {/* Page size */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">Show:</span>
            <Select
              onValueChange={handlePageSizeChange}
              defaultValue={String(pageSize)}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* All Blogs */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
            ) : (
              <div className="col-span-full flex items-center justify-center py-24">
                <NoResultsFound />
              </div>
            )}
          </div>
          <CustomPagination
            currentPage={currentPage}
            totalPage={pagination.total_page}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </main>
  );
}
