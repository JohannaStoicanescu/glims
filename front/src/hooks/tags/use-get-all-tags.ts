import { useQuery } from '@tanstack/react-query';

const getAllTags = async () => {
  return await fetch('/tags').then((res) => res.json());
};

const useGetAllTags = () => {
  return useQuery({
    queryKey: ['all-tags'],
    queryFn: async () => await getAllTags(),
  });
};

export default useGetAllTags;
