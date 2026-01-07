import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createMedia = async (data: any) => {
  return axios.post('/media', data);
};

const useCreateMedia = () => {
  return useMutation({
    mutationFn: async (data: any) => await createMedia(data),
  });
};

export default useCreateMedia;
