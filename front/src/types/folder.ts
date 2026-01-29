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
