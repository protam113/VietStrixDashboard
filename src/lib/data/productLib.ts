'use client';
import { useProductList, useProductDetail } from '@/hooks/Product/useProduct';
import { Filters } from '@/types/types';
import { logDebug } from '../logger';

// ProductList.ts
export const ProductList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useProductList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.data?.pagination ?? { page: 1, total_page: 1 };

  const nextPage =
    pagination.page < pagination.total_page ? pagination.page + 1 : null;

  const products = data?.data?.result ?? [];
  logDebug('🐞 Extracted Product:', products);

  return {
    products,
    isLoading,
    isError,
    pagination,
    nextPage,
  };
};

// ProductDetail.ts
export const ProductDetail = (productSlug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useProductDetail(
    productSlug,
    refreshKey
  );
  logDebug('🐞 Data:', data);

  const product = data?.data;
  logDebug('🐞 Extracted Product:', product);

  return {
    product,
    isLoading,
    isError,
  };
};
