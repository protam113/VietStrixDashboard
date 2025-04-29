'use client';

import { Filters } from '@/types/types';
import { useBlogDetail, useBlogList } from '@/hooks/Blog/useBlog';

export const BlogList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useBlogList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo có giá trị mặc định cho pagination
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Lấy danh sách tài liệu (docs) từ API
  const blogs = data?.results ?? [];

  return {
    blogs,
    isLoading,
    isError,
    pagination,
  };
};

// BlogDetailData.ts
export const BlogDetailData = (slug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useBlogDetail(slug, refreshKey);

  const blog = data?.result; // Changed from data?.data to data

  return {
    blog,
    isLoading,
    isError,
  };
};
