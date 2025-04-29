'use client';

import { useFaQList } from '@/hooks/faq/useFaQ';
import { Filters } from '@/types/types';

export const FaQlist = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useFaQList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const faqs = data?.results ?? [];

  return {
    faqs,
    isLoading,
    isError,
    pagination,
  };
};
