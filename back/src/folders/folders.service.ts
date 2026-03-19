import { Injectable } from '@nestjs/common';
import { Folder, Prisma } from '@prisma/client';
import { FoldersRepository } from './folders.repository';
import { TagsService } from '../tags/tags.service';
import { randomUUID } from 'crypto';
import { GetUserFoldersQueryDto } from './dto/get-user-folders-query.dto';
import { S3StorageService } from 'src/storage/s3-storage.service';
import { ReactionsService } from '../reactions/reactions.service';
import { EnrichedFolder, FolderWithEnrichment } from 'src/lib/types';

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
    private readonly tagsService: TagsService,
    private readonly storageService: S3StorageService,
    private readonly reactionsService: ReactionsService
  ) {}

  private async enrichFolder(
    folder: FolderWithEnrichment | null
  ): Promise<EnrichedFolder | null> {
    if (!folder) return null;

    const media_count = folder._count?.media ?? 0;
    let thumbnail_url: string | undefined;

    if (folder.media && folder.media.length > 0) {
      try {
        thumbnail_url = await this.storageService.getPresignedUrl(
          folder.media[0].storage_id
        );
      } catch (error) {
        console.error('Error generating presigned URL for thumbnail:', error);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _count: _, media: __, ...rest } = folder;
    return {
      ...(rest as Folder),
      media_count,
      thumbnail_url,
      createdAt: folder.created_at,
      updatedAt: folder.updated_at,
    };
  }

  async getFolderById(
    folder_id: string,
    user_id: string
  ): Promise<EnrichedFolder | null> {
    const folder = await this.checkFolderOwnership(folder_id, user_id);
    return this.enrichFolder(folder as unknown as FolderWithEnrichment);
  }

  async getUserFolders(
    owner_id: string,
    query?: GetUserFoldersQueryDto
  ): Promise<EnrichedFolder[]> {
    const folders = await this.repository.getUserFolders(owner_id, query);
    const enriched = await Promise.all(
      folders.map((f) => this.enrichFolder(f))
    );
    return enriched.filter((f): f is EnrichedFolder => f !== null);
  }

  async createFolder(
    data: {
      title: string;
      description?: string;
      password?: string;
      tags?: string[];
      reaction_types?: string[];
    },
    owner_id: string
  ): Promise<EnrichedFolder | null> {
    // Generate unique URLs for the folder
    const upload_url = randomUUID();
    const download_url = randomUUID();

    const folderData: Prisma.FolderCreateInput = {
      title: data.title,
      description: data.description,
      password: data.password,
      upload_url,
      download_url,
      owner: { connect: { id: owner_id } },
    };

    // Add tags if provided
    if (data.tags && data.tags.length > 0) {
      folderData.tags = {
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };
    }

    // Add reaction types if provided
    if (data.reaction_types && data.reaction_types.length > 0) {
      const reactionTypes =
        await this.reactionsService.getReactionTypesByIdentifiers(
          data.reaction_types
        );
      folderData.available_reactions = {
        connect: reactionTypes.map((rt) => ({ id: rt.id })),
      };
    }

    const folder = await this.repository.createFolder(folderData);
    return this.enrichFolder(folder as unknown as FolderWithEnrichment);
  }

  async updateFolder(
    folder_id: string,
    data: {
      title?: string;
      description?: string;
      password?: string;
      tags?: string[];
      reaction_types?: string[];
    },
    owner_id: string
  ): Promise<EnrichedFolder | null> {
    await this.checkFolderOwnership(folder_id, owner_id);

    const folderData: Prisma.FolderUpdateInput = {
      title: data.title,
      description: data.description,
      password: data.password,
    };

    // Update tags if provided
    if (data.tags) {
      folderData.tags = {
        set: [], // Clear existing tags
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };
    }

    // Update reaction types if provided
    if (data.reaction_types) {
      const reactionTypes =
        await this.reactionsService.getReactionTypesByIdentifiers(
          data.reaction_types
        );
      folderData.available_reactions = {
        set: reactionTypes.map((rt) => ({ id: rt.id })),
      };
    }

    const folder = await this.repository.updateFolder(folder_id, folderData);
    return this.enrichFolder(folder as unknown as FolderWithEnrichment);
  }

  async deleteManyFolders(
    folder_ids: string[],
    owner_id: string
  ): Promise<Folder[]> {
    for (const folder_id of folder_ids) {
      await this.checkFolderOwnership(folder_id, owner_id);
    }
    return this.repository.deleteManyFolders(folder_ids, owner_id);
  }

  async refreshFolderLinks(
    owner_id: string,
    folder_id: string
  ): Promise<EnrichedFolder | null> {
    await this.checkFolderOwnership(folder_id, owner_id);

    const folderData: Prisma.FolderUpdateInput = {
      upload_url: randomUUID(),
      download_url: randomUUID(),
    };

    const folder = await this.repository.updateFolder(folder_id, folderData);
    return this.enrichFolder(folder as unknown as FolderWithEnrichment);
  }

  private async checkFolderOwnership(
    folder_id: string,
    owner_id: string
  ): Promise<Folder> {
    const folder = await this.repository.getFolderById(folder_id);
    if (!folder) throw new FoldersException(FoldersError.FOLDER_NOT_FOUND);
    if (folder.owner_id !== owner_id)
      throw new FoldersException(FoldersError.FORBIDDEN);
    return folder as unknown as Folder;
  }
}
