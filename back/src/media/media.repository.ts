import { Injectable } from '@nestjs/common';
import { Media, Prisma, Folder } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMediaById(media_id: string): Promise<Media | null> {
    return this.prisma.media.findUnique({ where: { id: media_id } });
  }

  async getUserMedia(
    user_id: string,
    skip: number,
    take: number
  ): Promise<Media[]> {
    return this.prisma.media.findMany({
      where: { user_id },
      skip,
      take,
      orderBy: { created_at: 'desc' },
    });
  }

  async countUserMedia(user_id: string): Promise<number> {
    return this.prisma.media.count({ where: { user_id } });
  }

  async getFolderMedia(
    folder_id: string,
    skip: number,
    take: number
  ): Promise<Media[]> {
    return this.prisma.media.findMany({
      where: { folder_id },
      skip,
      take,
      orderBy: { created_at: 'desc' },
    });
  }

  async countFolderMedia(folder_id: string): Promise<number> {
    return this.prisma.media.count({ where: { folder_id } });
  }

  async getUserFolderMedia(
    user_id: string,
    folder_id: string,
    skip: number,
    take: number
  ): Promise<Media[]> {
    return this.prisma.media.findMany({
      where: { user_id, folder_id },
      skip,
      take,
      orderBy: { created_at: 'desc' },
    });
  }

  async countUserFolderMedia(
    user_id: string,
    folder_id: string
  ): Promise<number> {
    return this.prisma.media.count({ where: { user_id, folder_id } });
  }

  async createMedia(data: Prisma.MediaCreateInput): Promise<Media> {
    return this.prisma.media.create({ data });
  }

  async deleteMedia(where: Prisma.MediaWhereUniqueInput): Promise<Media> {
    return this.prisma.media.delete({ where });
  }

  async getFolderById(folder_id: string): Promise<Folder | null> {
    return this.prisma.folder.findUnique({ where: { id: folder_id } });
  }
}
