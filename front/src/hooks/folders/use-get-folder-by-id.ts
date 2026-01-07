import { useQuery } from '@tanstack/react-query';

const getFolderById = async (folderId: string) => {
  await fetch(`/folders/${folderId}`).then((res) => res.json());
};

const useGetFolderById = (folderId: string) => {
  return useQuery({
    queryKey: ['folder', folderId],
    queryFn: async () => await getFolderById(folderId),
  });
};

export default useGetFolderById;
