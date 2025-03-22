'use client';

import { Filters } from '@/types/types';
import { logDebug } from '../logger';
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
  const pagination = data?.pagination ?? { currentPage: 1, totalPages: 1 };

  // Lấy danh sách tài liệu (docs) từ API
  const blogs = data?.data ?? [];

  return {
    blogs,
    isLoading,
    isError,
    pagination,
  };
};

// DocumentDetail.ts
export const DocumentDetail = (documentSlug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useBlogDetail(documentSlug, refreshKey);
  logDebug('🐞 Data:', data);

  const blog = data;
  logDebug('🐞 Extracted document:', document);

  return {
    blog,
    isLoading,
    isError,
  };
};
