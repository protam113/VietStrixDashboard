'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  Filters,
  FetchBlogListResponse,
  BlogDetailResponse,
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

const fetchBlogList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchBlogListResponse> => {
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
      `${endpoints.blogs}${queryString ? `?${queryString}` : ''}`,
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
const useBlogList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchBlogListResponse, Error>({
    queryKey: ['blogList', page, filters, refreshKey],
    queryFn: () => fetchBlogList(page, filters),
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

const fetchBlogDetail = async (slug: string): Promise<BlogDetailResponse> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.blog) {
      throw null;
    }
    // Call API
    const response = await handleDocumentAPI(
      `${endpoints.blog.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useBlogDetail = (slug: string, refreshKey: number) => {
  return useQuery<BlogDetailResponse, Error>({
    queryKey: ['blogDetail', slug, refreshKey],
    queryFn: () => fetchBlogDetail(slug),
    enabled: !!slug,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useBlogDetail ==========
 */

export { useBlogList, useBlogDetail };
