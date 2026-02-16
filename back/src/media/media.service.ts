import { Injectable } from '@nestjs/common';
import { Media, Prisma } from '@prisma/client';
import { MediaRepository } from './media.repository';
import { PaginatedResult } from 'src/lib/types';
import { randomUUID } from 'crypto';
import { S3StorageService } from 'src/storage/s3-storage.service';

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
    private readonly storage: S3StorageService
  ) { }

  async getMediaById(media_id: string, user_id: string): Promise<Media> {
    const media = await this.checkMediaOwnership(media_id, user_id);
    return media;
  }

  async getMediaFile(
    media_id: string,
    user_id: string
  ): Promise<{ file: Buffer; contentType: string }> {
    const media = await this.checkMediaOwnership(media_id, user_id);

    // Check if file exists before trying to download
    const exists = await this.storage.fileExists(media.storage_id);
    if (!exists) {
      throw new MediaException(MediaError.MEDIA_NOT_FOUND);
    }

    const file = await this.storage.downloadFile(media.storage_id);
    return {
      file,
      contentType: media.type,
    };
  }

  async listUserMedia(
    target_user_id: string,
    requesting_user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<Media>> {
    // Users can only view their own media
    if (target_user_id !== requesting_user_id) {
      throw new MediaException(MediaError.FORBIDDEN);
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.repository.getUserMedia(target_user_id, skip, limit),
      this.repository.countUserMedia(target_user_id),
    ]);

    return { data, total, page, limit };
  }

  async getUserMedia(
    target_user_id: string,
    requesting_user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<
    PaginatedResult<{ media: Media; file: Buffer; contentType: string }>
  > {
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
    const mediaWithFiles = await Promise.allSettled(
      mediaList.map(async (media) => {
        // Check if file exists before trying to download
        const exists = await this.storage.fileExists(media.storage_id);
        if (!exists) {
          console.warn(
            `File not found in storage for media ${media.id} with storage_id: ${media.storage_id}`
          );
          throw new Error(`File not found for media ${media.id}`);
        }
        const file = await this.storage.downloadFile(media.storage_id);
        return {
          media,
          file,
          contentType: media.type,
        };
      })
    );

    // Filter out failed downloads and only return successful ones
    const successful = mediaWithFiles
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<{
          media: Media;
          file: Buffer;
          contentType: string;
        }> => result.status === 'fulfilled'
      )
      .map((result) => result.value);

    return { data: successful, total, page, limit };
  }

  async listFolderMedia(
    folder_id: string,
    user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<Media>> {
    // Check if user owns the folder
    await this.checkFolderOwnership(folder_id, user_id);

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.repository.getFolderMedia(folder_id, skip, limit),
      this.repository.countFolderMedia(folder_id),
    ]);

    return { data, total, page, limit };
  }

  async getFolderMedia(
    folder_id: string,
    user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<
    PaginatedResult<{ media: Media; file: Buffer; contentType: string }>
  > {
    // Check if user owns the folder
    await this.checkFolderOwnership(folder_id, user_id);

    const skip = (page - 1) * limit;
    const [mediaList, total] = await Promise.all([
      this.repository.getFolderMedia(folder_id, skip, limit),
      this.repository.countFolderMedia(folder_id),
    ]);

    // Fetch all files from storage, handling missing files gracefully
    const mediaWithFiles = await Promise.allSettled(
      mediaList.map(async (media) => {
        // Check if file exists before trying to download
        const exists = await this.storage.fileExists(media.storage_id);
        if (!exists) {
          console.warn(
            `File not found in storage for media ${media.id} with storage_id: ${media.storage_id}`
          );
          throw new Error(`File not found for media ${media.id}`);
        }
        const file = await this.storage.downloadFile(media.storage_id);
        return {
          media,
          file,
          contentType: media.type,
        };
      })
    );

    // Filter out failed downloads and only return successful ones
    const successful = mediaWithFiles
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<{
          media: Media;
          file: Buffer;
          contentType: string;
        }> => result.status === 'fulfilled'
      )
      .map((result) => result.value);

    return { data: successful, total, page, limit };
  }

  async listFolderUserMedia(
    folder_id: string,
    target_user_id: string,
    requesting_user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<Media>> {
    // Check if user owns the folder
    await this.checkFolderOwnership(folder_id, requesting_user_id);

    // Users can only view their own media
    if (target_user_id !== requesting_user_id) {
      throw new MediaException(MediaError.FORBIDDEN);
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.repository.getUserFolderMedia(
        target_user_id,
        folder_id,
        skip,
        limit
      ),
      this.repository.countUserFolderMedia(target_user_id, folder_id),
    ]);

    return { data, total, page, limit };
  }

  async getFolderUserMedia(
    folder_id: string,
    target_user_id: string,
    requesting_user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<
    PaginatedResult<{ media: Media; file: Buffer; contentType: string }>
  > {
    // Check if user owns the folder
    await this.checkFolderOwnership(folder_id, requesting_user_id);

    // Users can only view their own media
    if (target_user_id !== requesting_user_id) {
      throw new MediaException(MediaError.FORBIDDEN);
    }

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
    const mediaWithFiles = await Promise.allSettled(
      mediaList.map(async (media) => {
        // Check if file exists before trying to download
        const exists = await this.storage.fileExists(media.storage_id);
        if (!exists) {
          console.warn(
            `File not found in storage for media ${media.id} with storage_id: ${media.storage_id}`
          );
          throw new Error(`File not found for media ${media.id}`);
        }
        const file = await this.storage.downloadFile(media.storage_id);
        return {
          media,
          file,
          contentType: media.type,
        };
      })
    );

    // Filter out failed downloads and only return successful ones
    const successful = mediaWithFiles
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<{
          media: Media;
          file: Buffer;
          contentType: string;
        }> => result.status === 'fulfilled'
      )
      .map((result) => result.value);

    return { data: successful, total, page, limit };
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
    // Check if user owns the folder
    await this.checkFolderOwnership(data.folder_id, user_id);

    // Generate a unique key for the file
    const key = randomUUID();

    // Upload the actual file to storage
    const storage_id = await this.storage.uploadFile(key, data.file, data.type);

    // Create the media record with the storage_id from the uploaded file
    return this.repository.createMedia({
      storage_id,
      type: data.type,
      metadata: data.metadata,
      folder: { connect: { id: data.folder_id } },
      user: { connect: { id: user_id } },
    } as Prisma.MediaCreateInput);
  }

  async deleteMultipleMedia(
    media_ids: string[],
    user_id: string
  ): Promise<Media[]> {
    const mediaList: Media[] = [];
    for (const media_id of media_ids) {
      const media = await this.checkMediaOwnership(media_id, user_id);
      mediaList.push(media);
    }

    // Delete files from storage
    await Promise.all(
      mediaList.map((media) =>
        this.storage.deleteFile(media.storage_id).catch((error) => {
          console.error(
            `Failed to delete file from storage for media ${media.id} with storage_id: ${media.storage_id}`,
            error
          );
        })
      )
    );

    // Delete media records from database
    await this.repository.deleteManyMedia({
      id: { in: media_ids },
      user_id,
    });
    return mediaList;
  }

  private async checkMediaOwnership(
    media_id: string,
    user_id: string
  ): Promise<Media> {
    const media = await this.repository.getMediaById(media_id);
    if (!media) throw new MediaException(MediaError.MEDIA_NOT_FOUND);
    if (media.user_id !== user_id)
      throw new MediaException(MediaError.FORBIDDEN);
    return media;
  }

  private async checkFolderOwnership(
    folder_id: string,
    user_id: string
  ): Promise<void> {
    const folder = await this.repository.getFolderById(folder_id);
    if (!folder) {
      console.error(`Folder not found: ${folder_id}`);
      throw new MediaException(MediaError.FOLDER_NOT_FOUND);
    }
    if (folder.owner_id !== user_id) {
      console.error(
        `User ${user_id} does not own folder ${folder_id} (owner: ${folder.owner_id})`
      );
      throw new MediaException(MediaError.FORBIDDEN);
    }
  }
}
