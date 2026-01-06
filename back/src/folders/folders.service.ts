import { Injectable } from '@nestjs/common';
import { Folder } from '@prisma/client';
import { FoldersRepository } from './folders.repository';
import { randomUUID } from 'crypto';
import { StorageService } from 'src/storage/storage.interface';
import { GetUserFoldersQueryDto } from './dto/get-user-folders-query.dto';

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
  constructor(private readonly repository: FoldersRepository) { }

  async getFolderById(folder_id: string, user_id: string): Promise<Folder> {
    const folder = await this.checkFolderOwnership(folder_id, user_id);
    return folder;
  }

  async getUserFolders(
    owner_id: string,
    query?: GetUserFoldersQueryDto
  ): Promise<Folder[]> {
    return this.repository.getUserFolders(owner_id, query);
  }

  async createFolder(
    data: { title: string; description?: string; password?: string },
    user_id: string
  ): Promise<Folder> {
    const upload_url = randomUUID();
    const download_url = randomUUID();

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

    const upload_url = randomUUID();
    const download_url = randomUUID();

    return this.updateFolder(folder_id, user_id, { upload_url, download_url });
  }

  async deleteFolder(folder_id: string, user_id: string): Promise<Folder> {
    await this.checkFolderOwnership(folder_id, user_id);
    return this.repository.deleteFolder({ id: folder_id });
  }

  async deleteManyFolders(folder_ids: string[], user_id: string): Promise<Folder[]> {
    // Check ownership for all folders first
    const folders: Folder[] = [];
    for (const folder_id of folder_ids) {
      const folder = await this.checkFolderOwnership(folder_id, user_id);
      folders.push(folder);
    }

    // Delete all folders that passed ownership check
    await this.repository.deleteManyFolders({
      id: { in: folder_ids },
      owner_id: user_id,
    });

    return folders;
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
