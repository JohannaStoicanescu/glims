import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const deleteMedia = async (mediaIds: string[]) => {
  return apiClient.delete('/media', {
    data: { media_ids: mediaIds },
  });
};

const useDeleteMedia = () => {
  return useMutation({
    mutationFn: async (mediaIds: string[]) => await deleteMedia(mediaIds),
  });
};

export default useDeleteMedia;
