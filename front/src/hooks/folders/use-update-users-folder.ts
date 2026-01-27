import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { UpdateFolderInput } from '@/types';

const updateUsersFolder = async (folderId: string, data: UpdateFolderInput) => {
  return axios.patch(`/folders/${folderId}`, data);
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
