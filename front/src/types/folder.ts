export interface CreateFolderInput {
  title: string;
  description?: string;
  password?: string;
  tags?: string[];
}

export interface UpdateFolderInput {
  title?: string;
  description?: string;
  password?: string;
  tags?: string[];
}

/** Shape returned by the API for a folder/Glims */
export interface Folder {
  id: string;
  title: string;
  description?: string | null;
  owner_id: string;
  upload_url: string;
  download_url: string;
  password?: string | null;
  has_reached_limit: boolean;
  createdAt: string;
  updatedAt: string;
  /** Not in the backend DTO — optional local enrichment fields */
  thumbnail_url?: string;
  media_count?: number;
}
