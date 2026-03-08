import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getReactionsOfAMedia = async (mediaId: string) => {
  const { data } = await apiClient.get(`/reactions/media/${mediaId}`);
  return data;
};

const useGetReactionsOfAMedia = (mediaId: string) => {
  return useQuery({
    queryKey: ['reactions-of-media', mediaId],
    queryFn: () => getReactionsOfAMedia(mediaId),
    enabled: !!mediaId,
  });
};

export default useGetReactionsOfAMedia;
