import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const deleteMedia = async (mediaId: string) => {
  return apiClient.delete(`/media/${mediaId}`);
};

const useDeleteMedia = () => {
  return useMutation({
    mutationFn: async (mediaId: string) => await deleteMedia(mediaId),
  });
};

export default useDeleteMedia;
