import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteMedia = async (mediaId: string) => {
  return axios.delete(`/media/${mediaId}`);
};

const useDeleteMedia = () => {
  return useMutation({
    mutationFn: async (mediaId: string) => await deleteMedia(mediaId),
  });
};

export default useDeleteMedia;
