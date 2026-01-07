import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createFolder = async (data: any) => {
  return axios.post('/folders', data);
};

const useCreateFolder = () => {
  return useMutation({
    mutationFn: async (data: any) => await createFolder(data),
  });
};

export default useCreateFolder;
