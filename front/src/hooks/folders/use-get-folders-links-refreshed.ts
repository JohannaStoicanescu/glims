import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getFoldersLinksRefreshed = async (folderId: string) => {
  const { data } = await apiClient.get(`/folders/${folderId}/refresh-links`);
  return data;
};

const useGetFoldersLinksRefreshed = (folderId: string) => {
  return useQuery({
    queryKey: ['links-refreshed', folderId],
    queryFn: () => getFoldersLinksRefreshed(folderId),
    enabled: !!folderId,
  });
};

export default useGetFoldersLinksRefreshed;
