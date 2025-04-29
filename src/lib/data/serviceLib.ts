'use client';

import { useServiceDetail, useServiceList } from '@/hooks/service/useService';
import { Filters } from '@/types/types';

export const ServiceList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useServiceList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo có giá trị mặc định cho pagination
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Lấy danh sách tài liệu (docs) từ API
  const services = data?.results ?? [];

  return {
    services,
    isLoading,
    isError,
    pagination,
  };
};

// ServiceDetailData.ts
export const ServiceDetailData = (slug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useServiceDetail(slug, refreshKey);

  const service = data?.result; // Changed from data?.data to data

  return {
    service,
    isLoading,
    isError,
  };
};
