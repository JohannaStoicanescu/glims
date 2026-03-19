import { Folder, Media, Reaction, ReactionType } from '@prisma/client';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface UserBasicInfo {
  id: string;
  name: string;
  image: string | null;
}

export interface FolderWithEnrichment extends Folder {
  members: UserBasicInfo[];
  available_reactions: ReactionType[];
  _count: {
    media: number;
  };
  media: {
    storage_id: string;
  }[];
}

export interface EnrichedFolder extends Folder {
  media_count: number;
  thumbnail_url?: string;
  members?: UserBasicInfo[];
  available_reactions?: ReactionType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaWithFolder extends Media {
  folder: {
    title: string;
  };
}

export interface MediaWithReactions extends Media {
  reactions: (Reaction & {
    reaction_type: ReactionType;
  })[];
}

export interface MediaWithFile {
  media: Media;
  file: Buffer;
  contentType: string;
  folder_title?: string;
}
