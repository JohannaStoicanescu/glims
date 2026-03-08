import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getFolderById = async (folderId: string) => {
  const { data } = await apiClient.get(`/folders/${folderId}`);
  return data;
};

const useGetFolderById = (folderId: string) => {
  return useQuery({
    queryKey: ['folder', folderId],
    queryFn: () => getFolderById(folderId),
    enabled: !!folderId,
  });
};

export default useGetFolderById;
