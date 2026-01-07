import { useQuery } from '@tanstack/react-query';

const getFoldersLinksRefreshed = async (folderId: string) => {
  return await fetch(`/folders/${folderId}/refresh-links`).then((res) =>
    res.json()
  );
};

const useGetFoldersLinksRefreshed = (folderId: string) => {
  return useQuery({
    queryKey: ['links-refreshed', folderId],
    queryFn: async () => await getFoldersLinksRefreshed(folderId),
  });
};

export default useGetFoldersLinksRefreshed;
