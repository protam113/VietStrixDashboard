'use client';

import Heading from '@/components/heading/Heading';
import { BlogCategoriesList } from '@/lib/data/blogCategoriesLib';
import React from 'react';

const Page = () => {
  // Sử dụng hook để lấy dữ liệu categories
  const { categories, isLoading, isError } = BlogCategoriesList(
    1,
    { limit: 20 },
    0
  );

  return (
    <div>
      {/* Heading */}
      <Heading name="Blog Page" />

      {/* Link tạo bài viết */}
      <a href="/blogs/create_blog" className="text-blue-500 hover:underline">
        Tạo bài viết
      </a>

      {/* Kiểm tra trạng thái loading và error */}
      {isLoading && (
        <p className="text-gray-400 text-sm">Loading categories...</p>
      )}
      {isError && (
        <p className="text-red-500 text-sm">Error loading categories</p>
      )}

      {/* Hiển thị danh sách categories */}
      <div className="mt-4">
        {categories?.map((category) => (
          <div key={category._id} className="flex items-center gap-2 mb-2">
            {/* Thanh dọc bên trái */}
            <span className="w-1.5 h-8 bg-blue-600 mt-1"></span>
            {/* Tên danh mục */}
            <h3 className="text-sm font-bold text-blue-600">
              {category.name || 'Unnamed Category'}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
