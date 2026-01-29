import { useQuery } from '@tanstack/react-query';

const getMediaByFolderId = async (folderId: string) => {
  return await fetch(`/media/folder/${folderId}`).then((res) => res.json());
};

const useGetMediaByFolderId = (folderId: string) => {
  return useQuery({
    queryKey: ['media-by-folder', folderId],
    queryFn: async () => await getMediaByFolderId(folderId),
  });
};

export default useGetMediaByFolderId;
