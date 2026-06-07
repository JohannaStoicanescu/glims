import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateFolderInput } from '@/types';
import { apiClient } from '@/utils';

const createFolder = async (data: CreateFolderInput) => {
  return apiClient.post('/folders', data);
};

const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFolderInput) => await createFolder(data),
    onSuccess: () => {
      // Invalidate folders list to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: ['folders-list'],
      });
    },
  });
};

export default useCreateFolder;
