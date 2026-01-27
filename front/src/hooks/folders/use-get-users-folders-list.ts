import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getUsersFoldersList = async () => {
  const { data } = await apiClient.get('/folders');
  return data;
};

const useGetUsersFoldersList = (userId: string) => {
  return useQuery({
    queryKey: ['folders-list', userId],
    queryFn: getUsersFoldersList,
    enabled: !!userId,
  });
};

export default useGetUsersFoldersList;
