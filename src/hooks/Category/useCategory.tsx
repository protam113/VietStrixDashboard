'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  FetchCategoryDetailResponse,
  Filters,
  CreateCategoryItem,
  FetchCategoryListResponse,
  EditCategoryItem,
  DeleteCategoryItem,
} from '@/types/types';
import { handleAPI, handleProductAPI } from '@/api/axiosClient';
import { toast } from 'sonner';
import { logDebug } from '@/lib/logger';

/**
 * ==========================
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchCategoriesList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchCategoryListResponse> => {
  try {
    // Check if endpoint is valid
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    // Create query string from filters
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    // Call API
    const response = await handleProductAPI(
      `${endpoints.categories}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useCategoriesList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchCategoryListResponse, Error>({
    queryKey: ['categoriesList', page, filters, refreshKey],
    queryFn: () => fetchCategoriesList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCategoryDetail
 * ==========================
 *
 * @desc Custom hook to get detail of category
 * @returns {Category} Detail of category
 */

const fetchCategoryDetail = async (
  slug: string
): Promise<FetchCategoryDetailResponse> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.category) {
      throw null;
    }
    // Call API
    const response = await handleProductAPI(
      `${endpoints.category.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching category detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useCategoryDetail = (slug: string, refreshKey: number) => {
  return useQuery<FetchCategoryDetailResponse, Error>({
    queryKey: ['categoryDetail', slug, refreshKey],
    queryFn: () => fetchCategoryDetail(slug),
    enabled: !!slug,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoryDetail ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateCategory
 * ==========================
Create role
 **/

const CreateCategory = async (newCategory: CreateCategoryItem) => {
  const formData = new FormData();

  for (const key in newCategory) {
    if (Object.prototype.hasOwnProperty.call(newCategory, key)) {
      const value = newCategory[key as keyof CreateCategoryItem];

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
    const response = await handleProductAPI(
      `${endpoints.categories}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating category:', error.response?.data);
    logDebug('🐞 Data:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create category'
    );
  }
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createCategory: CreateCategoryItem) => {
      return CreateCategory(createCategory);
    },
    onSuccess: () => {
      toast.success('Category created successfully!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create category.');
      logDebug('🐞 Data:', error.message);
    },
  });
};

/**
 * ========== END OF @HOOK useCreateCategory ==========
 */

/**
 * ==========================
 * 📌 @HOOK useEditCategory
 * ==========================
Edit Category
 **/

const EditCategory = async (
  editCategory: EditCategoryItem,
  categoryId: string
) => {
  const formData = new FormData();

  for (const key in editCategory) {
    if (Object.prototype.hasOwnProperty.call(editCategory, key)) {
      const value = editCategory[key as keyof EditCategoryItem];

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
    if (!endpoints.categoryEdit) {
      throw null;
    }

    const url = endpoints.categoryEdit.replace(':id', categoryId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to edit category');
  }
};

const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      editCategory,
      categoryId,
    }: {
      editCategory: EditCategoryItem;
      categoryId: string;
    }) => {
      return EditCategory(editCategory, categoryId);
    },
    onSuccess: () => {
      toast.success('Category edited successfully!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
  });
};

/**
 * ========== END OF @HOOK useEditRole ==========
 */

/**
 * ==========================
 * 📌 @HOOK useDeleteCategory
 * ==========================
Delete Category
 **/

const DeleteCategory = async (deleteCategory: { ids: string[] }) => {
  const formData = new FormData();

  for (const key in deleteCategory) {
    const value = deleteCategory[key as keyof DeleteCategoryItem];

    if (key === 'ids' && Array.isArray(value)) {
      value.forEach((id) => formData.append('ids', id));
    } else if (typeof value === 'string') {
      formData.append(key, value);
    }
  }
  try {
    const response = await handleProductAPI(
      `${endpoints.categories}`,
      'DELETE',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error('Error deleting category:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to delete category'
    );
  }
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deleteCategory: { ids: string[] }) => {
      return DeleteCategory(deleteCategory);
    },
    onSuccess: () => {
      toast.success('Delete Category Success!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete role.');
    },
  });
};

/**
 * ========== END OF @HOOK useDeleteCategory ==========
 */

export {
  useCategoriesList,
  useCategoryDetail,
  useCreateCategory,
  useEditCategory,
  useDeleteCategory,
};
