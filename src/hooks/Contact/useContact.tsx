'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  Filters,
  FetchContactListResponse,
  UpdateContactStatus,
} from '@/types/types';
import { handleDocumentAPI } from '@/api/axiosClient';
import { toast } from 'sonner';
import { logDebug } from '@/lib/logger';

/**
 * ==========================
 * 📌 @HOOK useContactList
 * ==========================
 *
 * @desc Custom hook to get list of contacts.
 * @returns {Contacts[]} List of contacts.
/
 */

const fetchContactList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchContactListResponse> => {
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
      `${endpoints.contacts}${queryString ? `?${queryString}` : ''}`,
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
 * Custom hook to get list of contacts using React Query.
 */
const useContactList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchContactListResponse, Error>({
    queryKey: ['contactList', page, filters, refreshKey],
    queryFn: () => fetchContactList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useContactsList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useUpdateStatus
 * ==========================
Edit Status
 **/

const EditStatus = async (
  updateStatus: UpdateContactStatus,
  contactId: string
) => {
  const formData = new FormData();

  for (const key in updateStatus) {
    if (Object.prototype.hasOwnProperty.call(updateStatus, key)) {
      const value = updateStatus[key as keyof UpdateContactStatus];

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
    if (!endpoints.contact) {
      throw null;
    }

    const url = endpoints.contact.replace(':id', contactId);

    const response = await handleDocumentAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update contact'
    );
  }
};

const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateStatus,
      contactId,
    }: {
      updateStatus: UpdateContactStatus;
      contactId: string;
    }) => {
      return EditStatus(updateStatus, contactId);
    },
    onSuccess: () => {
      toast.success('Update status successfully!');
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
  });
};

/**
 * ========== END OF @HOOK useUpdateStatus ==========
 */

/**
 * ========== END OF @HOOK useCreateContact ==========
 */

const DeleteContact = async (contactId: string) => {
  try {
    if (!endpoints.contact) {
      throw new Error('Contact endpoint is not defined.');
    }

    const response = await handleDocumentAPI(
      `${endpoints.contact.replace(':id', contactId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Contact:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Contact'
    );
  }
};

const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteContact, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Contact Success!');
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Contact.');
      toast.error(error.message || 'Failed to delete Contact.');
    },
  });
};

export { useContactList, useUpdateStatus, useDeleteContact };
