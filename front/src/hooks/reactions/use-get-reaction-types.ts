import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

export interface ReactionType {
  id: string;
  name: string;
  svg: string;
}

const getReactionTypes = async (): Promise<ReactionType[]> => {
  const { data } = await apiClient.get('/reactions/types');
  return data;
};

const useGetReactionTypes = () => {
  return useQuery({
    queryKey: ['reaction-types'],
    queryFn: getReactionTypes,
  });
};

export default useGetReactionTypes;
