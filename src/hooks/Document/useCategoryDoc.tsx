'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  Filters,
  FetchDocsCategoryListResponse,
  CreateDocsCategoryItem,
} from '@/types/types';
import { handleDocumentAPI } from '@/api/axiosClient';
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

const fetchDocsCategoriesList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchDocsCategoryListResponse> => {
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
    const response = await handleDocumentAPI(
      `${endpoints.cateDocs}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    logDebug(handleDocumentAPI);

    return response;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useDocsCategoriesList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchDocsCategoryListResponse, Error>({
    queryKey: ['docsCategoriesList', page, filters, refreshKey],
    queryFn: () => fetchDocsCategoriesList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateCategory
 * ==========================
Create role
 **/

const CreateCategory = async (newDocCategory: CreateDocsCategoryItem) => {
  const formData = new FormData();

  for (const key in newDocCategory) {
    if (Object.prototype.hasOwnProperty.call(newDocCategory, key)) {
      const value = newDocCategory[key as keyof CreateDocsCategoryItem];

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
    const response = await handleDocumentAPI(
      `${endpoints.cateDocs}`,
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

const useCreateDocCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newDocCategory: CreateDocsCategoryItem) => {
      return CreateCategory(newDocCategory);
    },
    onSuccess: () => {
      toast.success('Category created successfully!');
      queryClient.invalidateQueries({ queryKey: ['docsCategoriesList'] });
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

export { useDocsCategoriesList, useCreateDocCategory };
