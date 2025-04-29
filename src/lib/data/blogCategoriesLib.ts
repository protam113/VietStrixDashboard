'use client';
import { useBlogCategoryList } from '@/hooks/Blog/useCategoryBlog';
import { Filters } from '@/types/types';

// CategoryList.ts
export const BlogCategoriesList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useBlogCategoryList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo pagination luôn có giá trị mặc định
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Tính toán nextPage

  const categories = data?.results ?? [];

  return {
    categories,
    isLoading,
    isError,
    pagination,
  };
};
