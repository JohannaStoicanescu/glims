import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getMediaByFolderId = async (folderId: string) => {
  const { data } = await apiClient.get(`/media/folder/${folderId}`);
  return data;
};

const useGetMediaByFolderId = (folderId: string) => {
  return useQuery({
    queryKey: ['media-by-folder', folderId],
    queryFn: () => getMediaByFolderId(folderId),
    enabled: !!folderId,
  });
};

export default useGetMediaByFolderId;
