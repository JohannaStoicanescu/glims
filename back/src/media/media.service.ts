import { Injectable } from '@nestjs/common';
import { Media, Prisma, Folder } from '@prisma/client';
import { MediaRepository } from './media.repository';
import { MediaWithFile, PaginatedResult } from 'src/lib/types';
import { randomUUID } from 'crypto';
import { S3StorageService } from 'src/storage/s3-storage.service';
import { FoldersRepository } from 'src/folders/folders.repository';

export enum MediaError {
  MEDIA_NOT_FOUND = 'Media not found',
  FOLDER_NOT_FOUND = 'Folder not found',
  FORBIDDEN = 'Not allowed',
}

export class MediaException extends Error {
  constructor(public readonly type: MediaError) {
    super(type);
  }
}

@Injectable()
export class MediaService {
  constructor(
    private readonly repository: MediaRepository,
    private readonly foldersRepository: FoldersRepository,
    private readonly storage: S3StorageService
  ) {}

  async getMediaById(media_id: string, user_id: string): Promise<Media> {
    const media = await this.repository.getMediaById(media_id);
    if (!media) {
      throw new MediaException(MediaError.MEDIA_NOT_FOUND);
    }

    // Check if user has access to the folder containing this media
    await this.checkFolderOwnership(media.folder_id, user_id);

    return media;
  }

  async getUserMedia(
    target_user_id: string,
    requesting_user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<MediaWithFile>> {
    // Users can only view their own media
    if (target_user_id !== requesting_user_id) {
      throw new MediaException(MediaError.FORBIDDEN);
    }

    const skip = (page - 1) * limit;
    const [mediaList, total] = await Promise.all([
      this.repository.getUserMedia(target_user_id, skip, limit),
      this.repository.countUserMedia(target_user_id),
    ]);

    // Fetch all files from storage, handling missing files gracefully
    const mediaWithFilesResults = await Promise.allSettled(
      mediaList.map(async (mediaItem) => {
        // Check if file exists before trying to download
        const exists = await this.storage.fileExists(mediaItem.storage_id);
        if (!exists) {
          console.warn(
            `File not found in storage for media ${mediaItem.id} with storage_id: ${mediaItem.storage_id}`
          );
          throw new Error(`File not found for media ${mediaItem.id}`);
        }
        const file = await this.storage.downloadFile(mediaItem.storage_id);
        return {
          media: mediaItem,
          file,
          contentType: mediaItem.type,
          folder_title: mediaItem.folder?.title,
        } as MediaWithFile;
      })
    );

    // Filter out failed downloads and only return successful ones
    const data = mediaWithFilesResults
      .filter(
        (result): result is PromiseFulfilledResult<MediaWithFile> =>
          result.status === 'fulfilled'
      )
      .map((result) => result.value);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getFolderMedia(
    folder_id: string,
    user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<MediaWithFile>> {
    // Check if user owns the folder
    await this.checkFolderOwnership(folder_id, user_id);

    const skip = (page - 1) * limit;
    const [mediaList, total] = await Promise.all([
      this.repository.getFolderMedia(folder_id, skip, limit),
      this.repository.countFolderMedia(folder_id),
    ]);

    // Fetch all files from storage, handling missing files gracefully
    const mediaWithFilesResults = await Promise.allSettled(
      mediaList.map(async (mediaItem) => {
        // Check if file exists before trying to download
        const exists = await this.storage.fileExists(mediaItem.storage_id);
        if (!exists) {
          console.warn(
            `File not found in storage for media ${mediaItem.id} with storage_id: ${mediaItem.storage_id}`
          );
          throw new Error(`File not found for media ${mediaItem.id}`);
        }
        const file = await this.storage.downloadFile(mediaItem.storage_id);
        return {
          media: mediaItem,
          file,
          contentType: mediaItem.type,
        } as MediaWithFile;
      })
    );

    // Filter out failed downloads and only return successful ones
    const data = mediaWithFilesResults
      .filter(
        (result): result is PromiseFulfilledResult<MediaWithFile> =>
          result.status === 'fulfilled'
      )
      .map((result) => result.value);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getFolderUserMedia(
    folder_id: string,
    target_user_id: string,
    requesting_user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<MediaWithFile>> {
    // Check if user has access to this folder
    await this.checkFolderOwnership(folder_id, requesting_user_id);

    const skip = (page - 1) * limit;
    const [mediaList, total] = await Promise.all([
      this.repository.getUserFolderMedia(
        target_user_id,
        folder_id,
        skip,
        limit
      ),
      this.repository.countUserFolderMedia(target_user_id, folder_id),
    ]);

    // Fetch all files from storage, handling missing files gracefully
    const mediaWithFilesResults = await Promise.allSettled(
      mediaList.map(async (mediaItem) => {
        const file = await this.storage.downloadFile(mediaItem.storage_id);
        return {
          media: mediaItem,
          file,
          contentType: mediaItem.type,
        } as MediaWithFile;
      })
    );

    // Filter out failed downloads and only return successful ones
    const data = mediaWithFilesResults
      .filter(
        (result): result is PromiseFulfilledResult<MediaWithFile> =>
          result.status === 'fulfilled'
      )
      .map((result) => result.value);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async createMedia(
    data: {
      file: Buffer;
      type: string;
      folder_id: string;
      metadata?: unknown;
    },
    user_id: string
  ): Promise<Media> {
    // Check if user has access to this folder
    await this.checkFolderOwnership(data.folder_id, user_id);

    // Upload to storage
    const key = `folders/${data.folder_id}/${randomUUID()}`;
    const storage_id = await this.storage.uploadFile(key, data.file, data.type);

    // Save to database
    return this.repository.createMedia({
      type: data.type,
      storage_id,
      metadata: data.metadata as Prisma.InputJsonValue,
      folder: { connect: { id: data.folder_id } },
      user: { connect: { id: user_id } },
    });
  }

  async deleteMultipleMedia(
    media_ids: string[],
    user_id: string
  ): Promise<Media[]> {
    const deletedMedia: Media[] = [];

    for (const media_id of media_ids) {
      const media = await this.repository.getMediaById(media_id);
      if (!media) continue;

      // Check if user has access to delete (owner of media or owner of folder)
      const folder = await this.foldersRepository.getFolderById(
        media.folder_id
      );
      const isMediaOwner = media.user_id === user_id;
      const isFolderOwner = folder?.owner_id === user_id;

      if (!isMediaOwner && !isFolderOwner) {
        throw new MediaException(MediaError.FORBIDDEN);
      }

      // Delete from storage
      await this.storage.deleteFile(media.storage_id);

      // Delete from database
      await this.repository.deleteManyMedia({ id: media_id });
      deletedMedia.push(media);
    }

    return deletedMedia;
  }

  private async checkFolderOwnership(
    folder_id: string,
    user_id: string
  ): Promise<Folder> {
    const folder = await this.foldersRepository.getFolderById(folder_id);
    if (!folder) {
      throw new MediaException(MediaError.FOLDER_NOT_FOUND);
    }

    // Access check: User must be either owner or member
    const isOwner = folder.owner_id === user_id;
    const isMember = folder.members.some((member) => member.id === user_id);

    if (!isOwner && !isMember) {
      throw new MediaException(MediaError.FORBIDDEN);
    }

    return folder as unknown as Folder;
  }
}
