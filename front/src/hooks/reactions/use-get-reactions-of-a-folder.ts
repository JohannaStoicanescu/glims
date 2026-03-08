import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getReactionsOfAFolder = async (folderId: string) => {
  const { data } = await apiClient.get(`/reactions/${folderId}`);
  return data;
};

const useGetReactionsOfAFolder = (folderId: string) => {
  return useQuery({
    queryKey: ['reactions-of-folder', folderId],
    queryFn: () => getReactionsOfAFolder(folderId),
    enabled: !!folderId,
  });
};

export default useGetReactionsOfAFolder;
