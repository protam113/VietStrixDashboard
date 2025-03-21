'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  Filters,
  FetchDocsListResponse,
  DocumentDetailResponse,
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

const fetchDocumentList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchDocsListResponse> => {
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
      `${endpoints.documents}${queryString ? `?${queryString}` : ''}`,
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
const useDocumentList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchDocsListResponse, Error>({
    queryKey: ['documentList', page, filters, refreshKey],
    queryFn: () => fetchDocumentList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useDocumentDetail
 * ==========================
 *
 * @desc Custom hook to get detail of document
 * @param {string} slug Slug of document
 * @returns {Document} Detail of document
 */

const fetchDocumentDetail = async (
  slug: string
): Promise<DocumentDetailResponse> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.document) {
      throw null;
    }
    // Call API
    const response = await handleDocumentAPI(
      `${endpoints.document.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching document detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useDocumentDetail = (slug: string, refreshKey: number) => {
  return useQuery<DocumentDetailResponse, Error>({
    queryKey: ['documentDetail', slug, refreshKey],
    queryFn: () => fetchDocumentDetail(slug),
    enabled: !!slug,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useDocumentDetail ==========
 */

export { useDocumentList, useDocumentDetail };
