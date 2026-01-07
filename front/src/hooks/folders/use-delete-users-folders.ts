import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteUsersFolders = async (folderIds: Array<string>) => {
  return axios.delete('/folders', {
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
