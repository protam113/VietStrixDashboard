'use client';
import { useEmployeeList } from '@/hooks/Employee/useEmployee';
import { Filters } from '@/types/types'; // EmployeeList.ts
export const EmployeeList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useEmployeeList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.data?.pagination ?? { page: 1, total_page: 1 };

  const nextPage =
    pagination.page < pagination.total_page ? pagination.page + 1 : null;
  const employees = data?.data?.result ?? [];

  return {
    employees,
    isLoading,
    isError,
    pagination,
    nextPage,
  };
};
