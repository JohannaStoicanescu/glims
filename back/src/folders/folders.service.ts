import { Injectable } from '@nestjs/common';
import { Folder, Prisma } from '@prisma/client';
import { FoldersRepository } from './folders.repository';
import { TagsService } from '../tags/tags.service';
import { randomUUID } from 'crypto';
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
  constructor(
    private readonly repository: FoldersRepository,
    private readonly tagsService: TagsService
  ) {}

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
    data: {
      title: string;
      description?: string;
      password?: string;
      tags?: string[];
    },
    user_id: string
  ): Promise<Folder> {
    const upload_url = randomUUID();
    const download_url = randomUUID();

    const createData: Prisma.FolderCreateInput = {
      title: data.title,
      description: data.description,
      password: data.password,
      upload_url,
      download_url,
      owner: { connect: { id: user_id } },
    };

    // Handle tags if provided
    if (data.tags && data.tags.length > 0) {
      createData.tags = await this.tagsService.prepareTagsConnect(data.tags);
    }

    return this.repository.createFolder(createData);
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
      tags?: string[];
    }>
  ): Promise<Folder> {
    await this.checkFolderOwnership(folder_id, user_id);

    const updateData: Prisma.FolderUpdateInput = {};

    // Copy non-tag fields
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.password !== undefined) updateData.password = data.password;
    if (data.upload_url !== undefined) updateData.upload_url = data.upload_url;
    if (data.download_url !== undefined)
      updateData.download_url = data.download_url;

    // Handle tags if provided
    if (data.tags !== undefined) {
      if (data.tags.length === 0) {
        // Remove all tags
        updateData.tags = { set: [] };
      } else {
        // Replace tags with new ones - ensure tags exist first
        await this.tagsService.prepareTagsConnect(data.tags);
        // Then set them (replace all existing tags)
        updateData.tags = {
          set: data.tags.map((name) => ({ name })),
        };
      }
    }

    return this.repository.updateFolder({
      where: { id: folder_id },
      data: updateData,
    });
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

  async deleteManyFolders(
    folder_ids: string[],
    user_id: string
  ): Promise<Folder[]> {
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
