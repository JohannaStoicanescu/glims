import { useQuery } from '@tanstack/react-query';

const getMediaById = async (mediaId: string) => {
  return await fetch(`/media/${mediaId}`).then((res) => res.json());
};

const useGetMediaById = (mediaId: string) => {
  return useQuery({
    queryKey: ['media', mediaId],
    queryFn: async () => await getMediaById(mediaId),
  });
};

export default useGetMediaById;
