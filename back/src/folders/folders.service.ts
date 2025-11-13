import { Injectable } from '@nestjs/common';
import { Folder } from '@prisma/client';
import { FoldersRepository } from './folders.repository';
import { uuidv4 } from 'better-auth';

export enum FoldersError {
  FOLDER_NOT_FOUND = 'Folder not found',
  FORBIDDEN = 'Not allowed',
}

export class FoldersException extends Error {
  constructor(public readonly type: FoldersError) {
    super(type);
  }
}

@Injectable()
export class FoldersService {
  constructor(private readonly repository: FoldersRepository) {}

  async getFolderById(folder_id: string, user_id: string): Promise<Folder> {
    const folder = await this.checkFolderOwnership(folder_id, user_id);
    return folder;
  }

  async getUserFolders(owner_id: string): Promise<Folder[]> {
    return this.repository.getUserFolders(owner_id);
  }

  async createFolder(
    data: { title: string; description?: string; password?: string },
    user_id: string
  ): Promise<Folder> {
    const upload_url = uuidv4().format;
    const download_url = uuidv4().format;

    return this.repository.createFolder({
      ...data,
      upload_url,
      download_url,
      owner: { connect: { id: user_id } },
    });
  }

  async updateFolder(
    folder_id: string,
    user_id: string,
    data: Partial<{
      title: string;
      description?: string;
      password?: string;
      upload_url: string;
      download_url: string;
    }>
  ): Promise<Folder> {
    await this.checkFolderOwnership(folder_id, user_id);
    return this.repository.updateFolder({ where: { id: folder_id }, data });
  }

  async refreshFolderLinks(
    user_id: string,
    folder_id: string
  ): Promise<Folder> {
    await this.checkFolderOwnership(folder_id, user_id);

    const upload_url = uuidv4().format;
    const download_url = uuidv4().format;

    return this.updateFolder(folder_id, user_id, { upload_url, download_url });
  }

  async deleteFolder(folder_id: string, user_id: string): Promise<Folder> {
    await this.checkFolderOwnership(folder_id, user_id);
    return this.repository.deleteFolder({ id: folder_id });
  }

  private async checkFolderOwnership(
    folder_id: string,
    owner_id: string
  ): Promise<Folder> {
    const folder = await this.repository.getFolderById(folder_id);
    if (!folder) throw new FoldersException(FoldersError.FOLDER_NOT_FOUND);
    if (folder.owner_id !== owner_id)
      throw new FoldersException(FoldersError.FORBIDDEN);
    return folder;
  }
}
