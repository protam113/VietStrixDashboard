'use client';

import { useState } from 'react';
import { BlogCard } from './BlogCard';
import { BlogList } from '@/lib/data/blogLib';
import { BlogNormalCard } from './BlogNormalCard';
import { BlogPopularCard } from './BlogPopularCard';
import { BlogCategoriesList } from '@/lib/data/blogCategoriesLib';

export default function BlogListData() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Lấy danh sách blogs
  const { blogs, isLoading, isError } = BlogList(
    1,
    { categories: selectedCategory ?? undefined },
    0
  );
  const { blogs: popularBlogs } = BlogList(
    1,
    { limit: 100, type: 'popular' },
    0
  );
  const { blogs: normalBlogs } = BlogList(1, { limit: 100, type: 'normal' }, 0);

  // Lấy danh sách categories
  const { categories } = BlogCategoriesList(1, { limit: 20 }, 0);

  if (isLoading || isError) return <p>Loading...</p>;

  // Lọc blogs theo categorySlug nếu có chọn category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.categorySlug === selectedCategory)
    : blogs;

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Popular Blogs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Popular Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularBlogs.map((blog) => (
              <BlogPopularCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>

        {/* Normal Blogs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Normal Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {normalBlogs.map((blog) => (
              <BlogNormalCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>

        {/* Category Cards */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg cursor-pointer shadow-md transition-all
                  ${selectedCategory === category.slug ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-300'}`}
              >
                {category.name}
              </div>
            ))}
            <div
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer shadow-md hover:bg-red-600"
            >
              Reset
            </div>
          </div>
        </section>

        {/* All Blogs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedCategory ? `Blogs in ${selectedCategory}` : 'All Blogs'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
