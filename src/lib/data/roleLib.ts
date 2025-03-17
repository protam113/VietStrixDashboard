'use client';
import { useRoleList } from '@/hooks/Role/useRoles';
import { Filters } from '@/types/types'; // EmployeeList.ts

// RoleList.ts
export const RoleList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useRoleList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.data?.pagination ?? { page: 1, total_page: 1 };

  const nextPage =
    pagination.page < pagination.total_page ? pagination.page + 1 : null;

  const roles = data?.data?.result ?? [];

  return {
    roles,
    isLoading,
    isError,
    pagination,
    nextPage,
  };
};
