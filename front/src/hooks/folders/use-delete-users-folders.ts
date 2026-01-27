import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const deleteUsersFolders = async (folderIds: Array<string>) => {
  return apiClient.delete('/folders', {
    data: { folderIds: folderIds },
  });
};

const useDeleteUsersFolders = () => {
  return useMutation({
    mutationFn: async (folderIds: Array<string>) =>
      await deleteUsersFolders(folderIds),
  });
};

export default useDeleteUsersFolders;
