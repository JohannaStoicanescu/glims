import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getMediaById = async (mediaId: string) => {
  const { data } = await apiClient.get(`/media/${mediaId}`);
  return data;
};

const useGetMediaById = (mediaId: string) => {
  return useQuery({
    queryKey: ['media', mediaId],
    queryFn: () => getMediaById(mediaId),
    enabled: !!mediaId,
  });
};

export default useGetMediaById;
