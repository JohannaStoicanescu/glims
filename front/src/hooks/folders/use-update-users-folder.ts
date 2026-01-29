import { useMutation } from '@tanstack/react-query';
import type { UpdateFolderInput } from '@/types';
import { apiClient } from '@/utils';

const updateUsersFolder = async (folderId: string, data: UpdateFolderInput) => {
  return apiClient.patch(`/folders/${folderId}`, data);
};

const useUsersFolder = () => {
  return useMutation({
    mutationFn: async ({
      folderId,
      data,
    }: {
      folderId: string;
      data: UpdateFolderInput;
    }) => await updateUsersFolder(folderId, data),
  });
};

export default useUsersFolder;
