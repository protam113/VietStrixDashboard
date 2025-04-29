'use client';

import {
  useDocumentDetail,
  useDocumentList,
} from '@/hooks/Document/useDocument';
import { Filters } from '@/types/types';
import { logDebug } from '../logger';

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
  const pagination = data?.pagination ?? { currentPage: 1, totalPages: 1 };

  // Lấy danh sách tài liệu (docs) từ API
  const docs = data?.result ?? [];

  return {
    docs,
    isLoading,
    isError,
    pagination,
  };
};

// DocumentDetail.ts
export const DocumentDetail = (documentSlug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useDocumentDetail(
    documentSlug,
    refreshKey
  );
  logDebug('🐞 Data:', data);

  const document = data?.data ?? null;
  logDebug('🐞 Extracted document:', document);

  return {
    document,
    isLoading,
    isError,
  };
};
