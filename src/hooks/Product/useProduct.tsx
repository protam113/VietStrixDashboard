'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import {
  Filters,
  FetchProductListResponse,
  FetchProductDetailResponse,
  CreateProductItem,
} from '@/types/types';
import { handleProductAPI } from '@/api/axiosClient';
import { toast } from 'sonner';
import { logTable } from '@/lib/logger';

/**
 * ==========================
 * 📌 @HOOK useProductList
 * ==========================
 *
 * @desc Custom hook to get list of products
 * @returns {Product[]} List of products
 */

const fetchProductList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchProductListResponse> => {
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
      `${endpoints.products}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching products list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of products using React Query.
 */
const useProductList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchProductListResponse, Error>({
    queryKey: ['productsList', page, filters, refreshKey],
    queryFn: () => fetchProductList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useProductList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useProductDetail
 * ==========================
 *
 * @desc Custom hook to get detail of product
 * @returns {Product} Detail of product
 */

const fetchProductDetail = async (
  slug: string
): Promise<FetchProductDetailResponse> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.product) {
      throw null;
    }
    // Call API
    const response = await handleProductAPI(
      `${endpoints.product.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useProductDetail = (slug: string, refreshKey: number) => {
  return useQuery<FetchProductDetailResponse, Error>({
    queryKey: ['productDetail', slug, refreshKey],
    queryFn: () => fetchProductDetail(slug),
    enabled: !!slug,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useProductDetail ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateProduct
 * ==========================
 *
 * @desc Custom hook to create a new product
 * @returns {Product} New product
 */

const CreateProduct = async (newProduct: CreateProductItem) => {
  console.log('Input product data:', newProduct);

  const formData = new FormData();
  // Chuyển dữ liệu sang JSON object, đảm bảo price là number
  // const payload = {
  //   ...newProduct,
  //   price: newProduct.price ? Number(newProduct.price) : 0, // Ép thành số
  //   files: newProduct.files ?? null, // Đảm bảo files không bị undefined
  // };
  for (const key in newProduct) {
    const value = newProduct[key as keyof CreateProductItem];

    if (key === 'categories' && Array.isArray(value)) {
      // Xử lý category
      value.forEach((id) => formData.append('categories', id));
    } // Nếu là mảng file
    if (key === 'files' && Array.isArray(value)) {
      value.forEach((file) => formData.append('files', file));
    } else if (value) {
      // Thêm các trường khác
      formData.append(key, value as string);
    }
  }

  console.log('Submitting JSON payload:', formData);

  try {
    const response = await handleProductAPI(
      `${endpoints.products}`,
      'POST',
      formData
    );

    logTable('Product Data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating product:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create product'
    );
  }
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: CreateProductItem) => {
      return CreateProduct(newProduct);
    },
    onSuccess: () => {
      toast.success('Create Product Success!');
      queryClient.invalidateQueries({ queryKey: ['productsList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create product.');
      console.error(error.message || 'Failed to create product.');
    },
  });
};

/**
 * ========== END OF @HOOK useCreateProduct ==========
 */

/**
 * ==========================
 * 📌 @HOOK useDeleteCategory
 * ==========================
Delete Category
 **/

const DeleteProduct = async (deleteProduct: { ids: string[] }) => {
  try {
    const response = await handleProductAPI(
      `${endpoints.products}`,
      'DELETE',
      deleteProduct
    );
    return response.data;
  } catch (error: any) {
    console.error('Error deleting product:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to delete product'
    );
  }
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deleteProduct: { ids: string[] }) => {
      return DeleteProduct(deleteProduct);
    },
    onSuccess: () => {
      toast.success('Delete Product Success!');
      queryClient.invalidateQueries({ queryKey: ['productsList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete product.');
    },
  });
};

/**
 * ========== END OF @HOOK useDeleteCategory ==========
 */

export { useProductList, useProductDetail, useDeleteProduct, useCreateProduct };
