'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  Filters,
  FetchFaQListResponse,
  CreateFaQItem,
  UpdateFaQItem,
} from '@/types/types';
import { handleDocumentAPI } from '@/api/axiosClient';
import { logDebug } from '@/lib/logger';
import { toast } from 'sonner';

/**
 * ==========================
 * 📌 @HOOK useFaQList
 * ==========================
 *
 * @desc Custom hook to get list of FaQ
 * @returns {FaQ[]} List of FaQ
 */

const fetchFaQList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchFaQListResponse> => {
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
      `${endpoints.faqs}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    logDebug(handleDocumentAPI);

    return response;
  } catch (error) {
    console.error('Error fetching faq list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useFaQList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchFaQListResponse, Error>({
    queryKey: ['faqList', page, filters, refreshKey],
    queryFn: () => fetchFaQList(page, filters),
    enabled: page > 0,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useFaQList ==========
 */

const DeleteFaq = async (faqId: string) => {
  try {
    if (!endpoints.faq) {
      throw new Error('Contact endpoint is not defined.');
    }

    const response = await handleDocumentAPI(
      `${endpoints.faq.replace(':id', faqId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Faq:',
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || 'Failed to delete Faq');
  }
};

const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteFaq, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Faq Success!');
      queryClient.invalidateQueries({ queryKey: ['faqList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Faq.');
      toast.error(error.message || 'Failed to delete Faq.');
    },
  });
};

const CreateFaq = async (newFaq: CreateFaQItem) => {
  const formData = new FormData();

  for (const key in newFaq) {
    const value = newFaq[key as keyof CreateFaQItem];

    if (value) {
      // Thêm các trường khác
      formData.append(key, value as string);
    }
  }

  try {
    const response = await handleDocumentAPI(
      `${endpoints.faqs}`,
      'POST',
      formData
    );

    return response.data;
  } catch (error: any) {
    console.error('Error creating Faq:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to create Faq');
  }
};

const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFaq: CreateFaQItem) => {
      return CreateFaq(newFaq);
    },
    onSuccess: () => {
      toast.success('Create Faq Success!');
      queryClient.invalidateQueries({ queryKey: ['faqList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create Faq.');
      console.error(error.message || 'Failed to create Faq.');
    },
  });
};

const updateFaq = async (updateStatus: UpdateFaQItem, postId: string) => {
  const formData = new FormData();

  for (const key in updateStatus) {
    if (Object.prototype.hasOwnProperty.call(updateStatus, key)) {
      const value = updateStatus[key as keyof UpdateFaQItem];

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
    if (!endpoints.faqStatus) {
      throw null;
    }

    const url = endpoints.faqStatus.replace(':id', postId);

    const response = await handleDocumentAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update FaQ');
  }
};

const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateStatus,
      postId,
    }: {
      updateStatus: UpdateFaQItem;
      postId: string;
    }) => {
      return updateFaq(updateStatus, postId);
    },
    onSuccess: () => {
      toast.success('Update FaQ successfully!');
      queryClient.invalidateQueries({ queryKey: ['faqList'] });
    },
  });
};

export { useFaQList, useDeleteFaq, useCreateFaq, useUpdateFaq };
