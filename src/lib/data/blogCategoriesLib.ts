'use client';
import { useBlogCategoriesList } from '@/hooks/Blog/useCategoryBlog';
import { Filters } from '@/types/types';

// BlogCategoriesList.ts
export const BlogCategoriesList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useBlogCategoriesList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo pagination luôn có giá trị mặc định
  const pagination = data?.pagination ?? { currentPage: 1, totalPages: 1 };

  // Tính toán nextPage

  const categories = data?.data ?? [];

  return {
    categories,
    isLoading,
    isError,
    pagination,
  };
};
