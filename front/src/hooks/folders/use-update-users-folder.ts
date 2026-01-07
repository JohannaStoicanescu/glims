import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const updateUsersFolder = async (folderId: string, data: any) => {
  return axios.patch(`/folders/${folderId}`, data);
};

const useUsersFolder = () => {
  return useMutation({
    mutationFn: async ({ folderId, data }: { folderId: string; data: any }) =>
      await updateUsersFolder(folderId, data),
  });
};

export default useUsersFolder;
