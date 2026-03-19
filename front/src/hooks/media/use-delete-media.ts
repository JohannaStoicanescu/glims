import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const deleteMedia = async (mediaIds: string[]) => {
  return apiClient.delete('/media', {
    data: { media_ids: mediaIds },
  });
};

const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaIds: string[]) => await deleteMedia(mediaIds),
    onSuccess: () => {
      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['media-by-folder'] });
      queryClient.invalidateQueries({ queryKey: ['users-media'] });
      queryClient.invalidateQueries({ queryKey: ['folders-list'] }); // In case folder thumbnails need refresh
    },
  });
};

export default useDeleteMedia;
