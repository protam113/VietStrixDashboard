'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  FetchEmployeeListResponse,
  Filters,
  CreateRoleItem,
} from '@/types/types';
import { handleAPI } from '@/api/axiosClient';
import { toast } from 'sonner';

// Hàm fetch danh sách employee
const fetchEmployeeList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchEmployeeListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    // Tạo query string từ filters
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    // Gọi API
    const response = await handleAPI(
      `${endpoints.employees}${queryString ? `?${queryString}` : ''}`,
      'GET'
    );
    return response;
  } catch (error) {
    console.error('Error fetching employee list:', error);
    throw error;
  }
};

const useEmployeeList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchEmployeeListResponse, Error>({
    queryKey: ['employeeList', page, filters, refreshKey],
    queryFn: () => fetchEmployeeList(page, filters),
    enabled: page > 0, // Bật query nếu page hợp lệ
    staleTime: 60000,
  });
};

export { useEmployeeList };
