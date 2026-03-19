import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

export interface Reaction {
  id: string;
  media_id: string;
  reaction_type_id: string;
  user_id: string;
  reaction_type: {
    id: string;
    name: string;
    svg: string;
  };
}

export interface MediaItem {
  id: string;
  type: string;
  storage_id: string;
  folder_id: string;
  user_id: string;
  metadata?: unknown;
  created_at: string;
  updated_at: string;
  url: string;
  contentType: string;
  reactions?: Reaction[];
}

interface RawMediaWithFile {
  media: {
    id: string;
    type: string;
    storage_id: string;
    folder_id: string;
    user_id: string;
    metadata?: unknown;
    created_at: string;
    updated_at: string;
    reactions: Reaction[];
  };
  file: { type: 'Buffer'; data: number[] } | string;
  contentType: string;
}

interface PaginatedMediaResponse {
  data: RawMediaWithFile[];
  total: number;
  page: number;
  limit: number;
}

function bufferToDataUrl(
  file: { type: 'Buffer'; data: number[] } | string,
  contentType: string
): string {
  if (typeof file === 'string') {
    return `data:${contentType};base64,${file}`;
  }
  const bytes = new Uint8Array(file.data);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  return `data:${contentType};base64,${base64}`;
}

const getMediaByFolderId = async (folderId: string): Promise<MediaItem[]> => {
  const { data } = await apiClient.get<PaginatedMediaResponse>(
    `/media/folder/${folderId}`
  );
  return data.data.map((item) => ({
    ...item.media,
    url: bufferToDataUrl(item.file, item.contentType),
    contentType: item.contentType,
  }));
};

const useGetMediaByFolderId = (folderId: string) => {
  return useQuery({
    queryKey: ['media-by-folder', folderId],
    queryFn: () => getMediaByFolderId(folderId),
    enabled: !!folderId,
  });
};

export default useGetMediaByFolderId;
