import { Injectable } from '@nestjs/common';
import { Folder, Prisma } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';
import { GetUserFoldersQueryDto, SortBy, SortOrder } from './dto/get-user-folders-query.dto';

@Injectable()
export class FoldersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getFolderById(folder_id: string): Promise<Folder | null> {
    return this.prisma.folder.findUnique({ where: { id: folder_id } });
  }

  async getUserFolders(
    user_id: string,
    query?: GetUserFoldersQueryDto
  ): Promise<Folder[]> {
    const where: Prisma.FolderWhereInput = {
      OR: [
        { owner_id: user_id },
        { members: { some: { id: user_id } } },
      ],
    };

    // Filter by owner_id if provided (allows filtering folders owned by a specific user)
    // Still ensure user has access (is owner or member)
    if (query?.owner_id) {
      where.AND = [
        { owner_id: query.owner_id },
        {
          OR: [
            { owner_id: user_id },
            { members: { some: { id: user_id } } },
          ],
        },
      ];
      delete where.OR;
    }

    // Filter by date range
    if (query?.startDate || query?.endDate) {
      const dateFilter: Prisma.DateTimeFilter = {};
      if (query.startDate) {
        dateFilter.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        dateFilter.lte = new Date(query.endDate);
      }
      
      if (Array.isArray(where.AND)) {
        where.AND.push({ created_at: dateFilter });
      } else if (where.AND) {
        where.AND = [where.AND, { created_at: dateFilter }];
      } else {
        where.created_at = dateFilter;
      }
    }

    // Sort configuration
    const sortBy = query?.sortBy || SortBy.CREATED_AT;
    const sortOrder = query?.sortOrder || SortOrder.DESC;

    const orderBy: Prisma.FolderOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    return this.prisma.folder.findMany({
      where,
      orderBy,
    });
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

  async deleteManyFolders(where: Prisma.FolderWhereInput): Promise<{ count: number }> {
    return this.prisma.folder.deleteMany({ where });
  }
}
