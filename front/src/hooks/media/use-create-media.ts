import { useMutation } from '@tanstack/react-query';
import type { CreateMediaInput } from '@/types';
import { apiClient } from '@/utils';

const createMedia = async (data: CreateMediaInput) => {
  const { file, folderId, metadata } = data;

  const formData = new FormData();

  formData.append('file', file);
  formData.append('folder_id', folderId);

  if (metadata) {
    formData.append(
      'metadata',
      typeof metadata === 'string' ? metadata : JSON.stringify(metadata)
    );
  }

  try {
    const response = await apiClient.post('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

const useCreateMedia = () => {
  return useMutation({
    mutationFn: async (data: CreateMediaInput) => await createMedia(data),
  });
};

export default useCreateMedia;
