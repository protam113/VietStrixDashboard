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
  const pagination = data?.pagination ?? {
    page: 1,
    totalPages: 1,
    limit: 10,
    total: 0,
  };

  // Truy xuất totalPages từ pagination
  const totalPages = pagination.totalPages;

  // Tính toán nextPage
  const nextPage = pagination.page < totalPages ? pagination.page + 1 : null;

  const categories = data?.data ?? [];

  return {
    categories,
    isLoading,
    isError,
    pagination,
    nextPage,
  };
};
