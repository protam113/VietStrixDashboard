'use client';
import {
  useCategoriesList,
  useCategoryDetail,
} from '@/hooks/Category/useCategory';
import { Filters } from '@/types/types';
import { logDebug } from '../logger';

// CategoriesList.ts
export const CategoriesList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useCategoriesList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.data?.pagination ?? { page: 1, total_page: 1 };

  const nextPage =
    pagination.page < pagination.total_page ? pagination.page + 1 : null;

  const categories = data?.data?.result ?? [];

  return {
    categories,
    isLoading,
    isError,
    pagination,
    nextPage,
  };
};

// CategoryDetail.ts
export const CategoryDetail = (categorySlug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useCategoryDetail(
    categorySlug,
    refreshKey
  );
  logDebug('🐞 Data:', data);

  const category = data?.data;
  logDebug('🐞 Extracted Category:', category);

  return {
    category,
    isLoading,
    isError,
  };
};
