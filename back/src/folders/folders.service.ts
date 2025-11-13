import { Injectable } from '@nestjs/common';
import { Folder, Prisma } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) { }

  async getFolderById(folder_id: string): Promise<Folder | null> {
    return this.prisma.folder.findUnique({ where: { id: folder_id } });
  }

  async getUserFolders(owner_id: string): Promise<Folder[]> {
    return this.prisma.folder.findMany({ where: { owner_id } });
  }

  async createFolder(data: Prisma.FolderCreateInput): Promise<Folder> {
    return this.prisma.folder.create({ data });
  }

  async updateFolder(params: {
    where: Prisma.FolderWhereUniqueInput;
    data: Prisma.FolderUpdateInput;
  }): Promise<Folder> {
    return this.prisma.folder.update(params);
  }

  async deleteFolder(where: Prisma.FolderWhereUniqueInput): Promise<Folder> {
    return this.prisma.folder.delete({ where });
  }
}
