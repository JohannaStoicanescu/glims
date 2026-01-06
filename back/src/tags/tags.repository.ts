import { Injectable } from '@nestjs/common';
import { Tag, Prisma } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class TagsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Gets all tags
   */
  async getAllTags(): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Gets tags from specific folders
   */
  async getTagsFromFolders(folderIds: string[]): Promise<Tag[]> {
    if (!folderIds || folderIds.length === 0) {
      return [];
    }

    const folders = await this.prisma.folder.findMany({
      where: { id: { in: folderIds } },
      include: { tags: true },
    });

    // Collect all unique tags
    const tagMap = new Map<string, Tag>();
    folders.forEach((folder) => {
      folder.tags.forEach((tag) => {
        if (!tagMap.has(tag.id)) {
          tagMap.set(tag.id, tag);
        }
      });
    });

    return Array.from(tagMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  /**
   * Creates tags if they don't exist and returns connect operations for them
   */
  async prepareTagsConnect(
    tagNames: string[]
  ): Promise<Prisma.TagCreateNestedManyWithoutFoldersInput> {
    if (!tagNames || tagNames.length === 0) {
      return { connect: [] };
    }

    // Find existing tags
    const existingTags = await this.prisma.tag.findMany({
      where: { name: { in: tagNames } },
    });

    const existingTagNames = new Set(existingTags.map((t) => t.name));
    const newTagNames = tagNames.filter((name) => !existingTagNames.has(name));

    // Create new tags
    if (newTagNames.length > 0) {
      await Promise.all(
        newTagNames.map((name) =>
          this.prisma.tag.create({
            data: { name },
          })
        )
      );
    }

    // Return connect operations for all tags
    return {
      connect: tagNames.map((name) => ({ name })),
    };
  }
}
