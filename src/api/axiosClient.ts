import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { apiServiceAuth, apiServiceProduct, apiServiceDocument } from './api';
import { logDebug } from '@/lib/logger';

const getApiKey = () => process.env.NEXT_PUBLIC_API_KEY || '';
const getPrivateApiKey = () => process.env.NEXT_PRIVATE_DOC_API_KEY || '';

const apiKey = getApiKey();
const apiPrivateKey = getPrivateApiKey();

/**
 * ==========================
 * 📌 @API Auth API
 * ==========================
 *
 * @desc Auth API Request
 */
const authApi = () => {
  return axios.create({
    baseURL: apiServiceAuth,
    headers: {
      'api-key': `${apiKey}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 15000, // 15 seconds timeout
  });
};

/**
 * ==========================
 * 📌 @API Product API
 * ==========================
 *
 * @desc Product API Request
 */
const productApi = () => {
  return axios.create({
    baseURL: apiServiceProduct,
    headers: {
      'api-key': `${apiKey}`,
      'Content-Type': 'application/form-data',
    },
    withCredentials: true,
    timeout: 15000, // 15 seconds timeout
  });
};

/**
 * ==========================
 * 📌 @API Document API
 * ==========================
 *
 * @desc Document API Request
 */
const docsApi = () => {
  return axios.create({
    baseURL: apiServiceDocument,
    headers: {
      'api-key': `${apiPrivateKey}`,
      'Content-Type': 'application/json',
    },
    // withCredentials: true,
    // timeout: 15000, // 15 seconds timeout
  });
};

/**
 * ==========================
 * 📌 @API Auth API
 * ==========================
 *
 * @desc Auth API Request
 */
export const handleAPI = async <T = any>(
  url: string,
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  logDebug('⬆️ API REQUEST:', {
    url: `${apiServiceAuth}${url}`,
    method,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    timestamp: new Date().toISOString(),
  });

  try {
    const apiInstance = authApi();
    const config: AxiosRequestConfig = {
      url,
      method,
    };

    // Handle data appropriately based on request method
    if (method !== 'GET' && data) {
      config.data = data;
    } else if (method === 'GET' && data) {
      config.params = data;
    }

    const startTime = Date.now();
    const response: AxiosResponse = await apiInstance(config);
    const endTime = Date.now();

    // Log successful response
    logDebug('✅ API RESPONSE SUCCESS:', {
      url: `${apiServiceAuth}${url}`,
      method,
      status: response.status,
      statusText: response.statusText,
      responseTime: `${endTime - startTime}ms`,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Log detailed error information
    if (axiosError.response) {
      // The request was made and the server responded with an error status code
      console.error('❌ API ERROR:', {
        url: `${apiServiceAuth}${url}`,
        method,
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
        timestamp: new Date().toISOString(),
      });
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('❌ API ERROR (NO RESPONSE):', {
        url: `${apiServiceAuth}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Something happened in setting up the request
      console.error('❌ API ERROR (SETUP):', {
        url: `${apiServiceAuth}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Re-throw the error for handling by the caller
    throw error;
  }
};

/**
 * ==========================
 * 📌 @API Product API
 * ==========================
 *
 * @desc Product API Request
 */
export const handleProductAPI = async <T = any>(
  url: string,
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  logDebug('⬆️ API REQUEST:', {
    url: `${apiServiceProduct}${url}`,
    method,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    timestamp: new Date().toISOString(),
  });

  try {
    const apiInstance = productApi();
    const config: AxiosRequestConfig = {
      url,
      method,
    };

    // Handle data appropriately based on request method
    if (method !== 'GET' && data) {
      config.data = data;
    } else if (method === 'GET' && data) {
      config.params = data;
    }

    const startTime = Date.now();
    const response: AxiosResponse = await apiInstance(config);
    const endTime = Date.now();

    // Log successful response
    logDebug('✅ API RESPONSE SUCCESS:', {
      url: `${apiServiceProduct}${url}`,
      method,
      status: response.status,
      statusText: response.statusText,
      responseTime: `${endTime - startTime}ms`,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Log detailed error information
    if (axiosError.response) {
      // The request was made and the server responded with an error status code
      console.error('❌ API ERROR:', {
        url: `${apiServiceProduct}${url}`,
        method,
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
        timestamp: new Date().toISOString(),
      });
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('❌ API ERROR (NO RESPONSE):', {
        url: `${apiServiceProduct}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Something happened in setting up the request
      console.error('❌ API ERROR (SETUP):', {
        url: `${apiServiceProduct}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Re-throw the error for handling by the caller
    throw error;
  }
};

/**
 * ==========================
 * 📌 @API Document API
 * ==========================
 *
 * @desc Document API Request
 */
export const handleDocumentAPI = async <T = any>(
  url: string,
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  logDebug('⬆️ API REQUEST:', {
    url: `${apiServiceDocument}${url}`,
    method,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    timestamp: new Date().toISOString(),
  });
  logDebug('Debug', apiServiceDocument);
  try {
    const apiInstance = docsApi();

    const config: AxiosRequestConfig = {
      url,
      method,
    };

    // Handle data appropriately based on request method
    if (method !== 'GET' && data) {
      config.data = data;
    } else if (method === 'GET' && data) {
      config.params = data;
    }

    const startTime = Date.now();
    const response: AxiosResponse = await apiInstance(config);
    const endTime = Date.now();

    // Log successful response
    logDebug('✅ API RESPONSE SUCCESS:', {
      url: `${apiServiceDocument}${url}`,
      method,
      status: response.status,
      statusText: response.statusText,
      responseTime: `${endTime - startTime}ms`,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Log detailed error information
    if (axiosError.response) {
      // The request was made and the server responded with an error status code
      console.error('❌ API ERROR:', {
        url: `${apiServiceDocument}${url}`,
        method,
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
        timestamp: new Date().toISOString(),
      });
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('❌ API ERROR (NO RESPONSE):', {
        url: `${apiServiceDocument}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Something happened in setting up the request
      console.error('❌ API ERROR (SETUP):', {
        url: `${apiServiceDocument}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Re-throw the error for handling by the caller
    throw error;
  }
};

// Helper function for GET requests
const getAPI = async <T = any>(url: string, params?: any): Promise<T> => {
  return handleAPI<T>(url, 'GET', params);
};

// Helper function for POST requests
const postAPI = async <T = any>(url: string, data?: any): Promise<T> => {
  return handleAPI<T>(url, 'POST', data);
};

// Helper function for PATCH requests
const patchAPI = async <T = any>(url: string, data?: any): Promise<T> => {
  return handleAPI<T>(url, 'PATCH', data);
};

// Helper function for DELETE requests
const deleteAPI = async <T = any>(url: string, data?: any): Promise<T> => {
  return handleAPI<T>(url, 'DELETE', data);
};

export { getAPI, postAPI, patchAPI, deleteAPI };
