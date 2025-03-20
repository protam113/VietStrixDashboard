'use client';

import { useDocumentList } from '@/hooks/Document/useDocument';
import { Filters } from '@/types/types';

export const DocumentList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useDocumentList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo có giá trị mặc định cho pagination
  const pagination = data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalDocs: 0,
  };

  // Lấy danh sách tài liệu (docs) từ API
  const docs = data?.data ?? [];

  // Kiểm tra có trang tiếp theo không
  const nextPage =
    pagination.currentPage < pagination.totalPages
      ? pagination.currentPage + 1
      : null;

  return {
    docs,
    isLoading,
    isError,
    pagination,
    nextPage,
  };
};
