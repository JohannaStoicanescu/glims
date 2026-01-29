import { useMutation } from '@tanstack/react-query';
import type { CreateFolderInput } from '@/types';
import { apiClient } from '@/utils';

const createFolder = async (data: CreateFolderInput) => {
  return apiClient.post('/folders', data);
};

const useCreateFolder = () => {
  return useMutation({
    mutationFn: async (data: CreateFolderInput) => await createFolder(data),
  });
};

export default useCreateFolder;
