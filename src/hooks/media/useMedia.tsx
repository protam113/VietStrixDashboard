'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import { UploadMedia } from '@/types/types';
import { handleDocumentAPI } from '@/api/axiosClient';

const CreateMedia = async (newMedia: UploadMedia) => {
  const formData = new FormData();
  for (const key in newMedia) {
    const value = newMedia[key as keyof UploadMedia];
    if (key === 'file') {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append('file', file));
      } else if (value instanceof File) {
        formData.append('file', value);
      }
    } else if (value) {
      formData.append(key, value as string);
    }
  }

  try {
    const response = await handleDocumentAPI(
      `${endpoints.media}`,
      'POST',
      formData
    );
    console.log('CreateMedia response:', response);
    return response; // Should return response.data if handleAPI returns response.data
  } catch (error: any) {
    console.error('Error creating media:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to upload media');
  }
};

const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMedia: UploadMedia) => {
      return CreateMedia(newMedia);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create category.');
    },
  });
};

export { useUploadMedia };
