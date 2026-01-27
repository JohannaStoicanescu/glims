import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { CreateFolderInput } from '@/types';

const createFolder = async (data: CreateFolderInput) => {
  return axios.post('/folders', data);
};

const useCreateFolder = () => {
  return useMutation({
    mutationFn: async (data: CreateFolderInput) => await createFolder(data),
  });
};

export default useCreateFolder;
