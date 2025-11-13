import { Injectable } from '@nestjs/common';
import { Folder, Prisma } from '@prisma/client';
import { FoldersRepository } from './folders.repository';

enum FoldersError {
  FOLDER_NOT_FOUND = 'Folder not found',
  NOT_ALLOWED = 'Not allowed',
}

class FoldersException extends Error {
  constructor(public readonly type: FoldersError) {
    super(type);
  }
}

@Injectable()
export class FoldersService {
  constructor(private readonly repository: FoldersRepository) { }

  async getFolderById(folder_id: string, user_id: string): Promise<Folder> {
    const folder = this.checkFolderOwnership(folder_id, user_id);
    return folder;
  }

  async getUserFolders(owner_id: string): Promise<Folder[]> {
    return this.repository.getUserFolders(owner_id);
  }

  async createFolder(data: Prisma.FolderCreateInput): Promise<Folder> {
    return this.repository.createFolder(data);
  }

  async updateFolder(params: {
    where: Prisma.FolderWhereUniqueInput;
    data: Prisma.FolderUpdateInput;
  }): Promise<Folder> {
    return this.repository.updateFolder(params);
  }

  async deleteFolder(where: Prisma.FolderWhereUniqueInput): Promise<Folder> {
    return this.repository.deleteFolder(where);
  }

  async checkFolderOwnership(
    folder_id: string,
    owner_id: string
  ): Promise<Folder> {
    const folder = await this.repository.getFolderById(folder_id);
    if (!folder) throw new FoldersException(FoldersError.FOLDER_NOT_FOUND);
    if (folder.owner_id !== owner_id)
      throw new FoldersException(FoldersError.NOT_ALLOWED);
    return folder;
  }
}
