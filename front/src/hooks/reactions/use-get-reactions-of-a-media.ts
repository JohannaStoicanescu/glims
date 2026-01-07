import { useQuery } from '@tanstack/react-query';

const getReactionsOfAMedia = async (mediaId: string) => {
  return await fetch(`/reactions/media/${mediaId}`).then((res) => res.json());
};

const useGetReactionsOfAMedia = (mediaId: string) => {
  return useQuery({
    queryKey: ['reactions-of-media', mediaId],
    queryFn: async () => await getReactionsOfAMedia(mediaId),
  });
};

export default useGetReactionsOfAMedia;
