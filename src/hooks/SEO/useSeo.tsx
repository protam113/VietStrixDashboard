'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import { SeoData, UpdateSeo } from '@/types/types';
import { handleDocumentAPI } from '@/api/axiosClient';
import { toast } from 'sonner';
import { logDebug } from '@/lib/logger';

/**
 * ==========================s
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchSeoData = async (): Promise<SeoData> => {
  try {
    // Call API
    const response = await handleDocumentAPI(`${endpoints.seo}`, 'GET', null);
    logDebug(handleDocumentAPI);

    return response;
  } catch (error) {
    console.error('Error fetching seo data:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useSeoData = (refreshKey: number) => {
  return useQuery<SeoData, Error>({
    queryKey: ['seoData', refreshKey],
    queryFn: () => fetchSeoData(),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

const UpdateSeoData = async (updateSeo: UpdateSeo) => {
  const formData = new FormData();

  for (const key in updateSeo) {
    if (Object.prototype.hasOwnProperty.call(updateSeo, key)) {
      const value = updateSeo[key as keyof UpdateSeo];

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
      `${endpoints.seo}`,
      'PATCH',
      formData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update contact'
    );
  }
};

const useUpdateSeo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updateSeo }: { updateSeo: UpdateSeo }) => {
      return UpdateSeoData(updateSeo);
    },
    onSuccess: () => {
      toast.success('Update seo successfully!');
      queryClient.invalidateQueries({ queryKey: ['seoData'] });
    },
  });
};

export { useSeoData, useUpdateSeo };
