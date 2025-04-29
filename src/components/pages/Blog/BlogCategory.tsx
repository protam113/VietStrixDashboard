'use client';

import { BlogCategoriesList } from '@/lib/data/blogCategoriesLib';
import React, { useState } from 'react';

// Khai báo type cho props
interface CategoryCardProps {
  onCategorySelect: (categoryId: string | null) => void;
}

// Định nghĩa type cho category
interface Category {
  _id: string;
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ onCategorySelect }) => {
  const { categories, isLoading, isError } = BlogCategoriesList(
    1,
    { limit: 20, status: 'draft' },
    0
  );
  console.log('🚀 ~ categories:', categories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId); // Gửi categoryId lên component cha
  };

  return (
    <nav className="flex overflow-x-auto pb-4 space-x-8">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-6 w-24 bg-gray-300 animate-pulse rounded-md"
          />
        ))
      ) : isError ? (
        <p className="text-red-500">Failed to load categories.</p>
      ) : (
        <>
          {/* View all - Không truyền categoryId */}
          <button
            onClick={() => handleCategoryClick(null)}
            className={`pb-4 px-1 font-medium ${
              selectedCategory === null
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            View all
          </button>

          {/* Danh sách categories */}
          {categories.map((category: Category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`pb-4 px-1 ${
                selectedCategory === category._id
                  ? 'text-primary border-b-2 border-primary font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category.title}
            </button>
          ))}
        </>
      )}
    </nav>
  );
};

export default CategoryCard;
