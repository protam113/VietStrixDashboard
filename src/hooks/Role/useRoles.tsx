'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import { FetchRoleListResponse, Filters, CreateRoleItem } from '@/types/types';
import { handleAPI } from '@/api/axiosClient';
import { toast } from 'sonner';

/**
 * ==========================
 * 📌 @HOOK useCreateRole
 * ==========================
Create role
 **/
const fetchRoleList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchRoleListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    // Gọi API
    const response = await handleAPI(
      `${endpoints.roles}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching role list:', error);
    throw error;
  }
};

const useRoleList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchRoleListResponse, Error>({
    queryKey: ['roleList', page, filters, refreshKey],
    queryFn: () => fetchRoleList(page, filters),
    enabled: page > 0, // Bật query nếu page hợp lệ
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useRoleList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateRole
 * ==========================
Create role
 **/

const CreateRole = async (newRole: CreateRoleItem) => {
  const formData = new FormData();

  for (const key in newRole) {
    if (Object.prototype.hasOwnProperty.call(newRole, key)) {
      const value = newRole[key as keyof CreateRoleItem];

      if (Array.isArray(value)) {
        // If the value is an array, append each element
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        // If the value is a string, append to FormData
        formData.append(key, value);
      }
    }
  }

  try {
    const response = await handleAPI(`${endpoints.roles}`, 'POST', formData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating role:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to create role');
  }
};

const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createRole: CreateRoleItem) => {
      return CreateRole(createRole);
    },
    onSuccess: () => {
      toast.success('Role created successfully!');
      queryClient.invalidateQueries({ queryKey: ['roleList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create role.');
    },
  });
};

/**
 * ========== END OF @HOOK useCreateRole ==========
 */

/**
 * ==========================
 * 📌 @HOOK useEditRole
 * ==========================
Edit role
 **/
const EditRole = async (editRole: CreateRoleItem, roleId: string) => {
  const formData = new FormData();

  for (const key in editRole) {
    if (Object.prototype.hasOwnProperty.call(editRole, key)) {
      const value = editRole[key as keyof CreateRoleItem];

      if (Array.isArray(value)) {
        // If the value is an array, append each element
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        // If the value is a string, append to FormData
        formData.append(key, value);
      }
    }
  }

  try {
    if (!endpoints.roleEdit) {
      throw null;
    }

    const url = endpoints.roleEdit.replace(':id', roleId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create role');
  }
};

const useEditRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      editRole,
      roleId,
    }: {
      editRole: CreateRoleItem;
      roleId: string;
    }) => {
      return EditRole(editRole, roleId);
    },
    onSuccess: () => {
      toast.success('Role edited successfully!');
      queryClient.invalidateQueries({ queryKey: ['roleList'] });
    },
  });
};

/**
 * ========== END OF @HOOK useEditRole ==========
 */

/**
 * ==========================
 * 📌 @HOOK useDeleteRole
 * ==========================
Delete role
 **/

const DeleteRole = async (deleteRole: { ids: string[] }) => {
  try {
    const response = await handleAPI(
      `${endpoints.roles}`,
      'DELETE',
      deleteRole
    ); // Không cần JSON.stringify
    return response.data;
  } catch (error: any) {
    console.error('Error deleting role:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to delete role');
  }
};

const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deleteRole: { ids: string[] }) => {
      return DeleteRole(deleteRole);
    },
    onSuccess: () => {
      toast.success('Delete Role Success!');
      queryClient.invalidateQueries({ queryKey: ['roleList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete role.');
    },
  });
};

/**
 * ========== END OF @HOOK useDeleteRole ==========
 */

export { useRoleList, useCreateRole, useEditRole, useDeleteRole };
