'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  FetchEmployeeListResponse,
  Filters,
  CreateEmployeeResponse,
} from '@/types/types';
import { handleAPI } from '@/api/axiosClient';
import { toast } from 'sonner';
import { logTable } from '@/lib/logger';

/**
 * ==========================
 * 📌 @HOOK useEmployeeList
 * ==========================
 *
 * @desc Custom hook to get list of employee
 * @returns {Employee} List of employee
 */

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

/**
 * ========== END OF @HOOK useEmployeeList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreate Employee
 * ==========================
 *
 * @desc Custom hook to create employee
 * @returns {Employee} Detail of employee
 */

const CreateEmployee = async (newEmployee: CreateEmployeeResponse) => {
  console.log('Input employee data:', newEmployee);

  try {
    const response = await handleAPI(
      `${endpoints.employees}`,
      'POST',
      JSON.stringify(newEmployee)
    );

    logTable('Employee Data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating employee:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create employee'
    );
  }
};

const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEmployee: CreateEmployeeResponse) => {
      return CreateEmployee(newEmployee);
    },
    onSuccess: () => {
      toast.success('Create Employee Success!');
      queryClient.invalidateQueries({ queryKey: ['employeeList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create employee.');
      console.error(error.message || 'Failed to create employee.');
    },
  });
};

/**
 * ========== END OF @HOOK useCreateEmployee ==========
 */

export { useEmployeeList, useCreateEmployee };
