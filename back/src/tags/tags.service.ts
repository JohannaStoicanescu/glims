import { Injectable } from '@nestjs/common';
import { Tag, Prisma } from '@prisma/client';
import { TagsRepository } from './tags.repository';
import { FoldersRepository } from '../folders/folders.repository';

@Injectable()
export class TagsService {
  constructor(
    private readonly repository: TagsRepository,
    private readonly foldersRepository: FoldersRepository
  ) {}

  async getAllTags(): Promise<Tag[]> {
    return this.repository.getAllTags();
  }

  async prepareTagsConnect(
    tagNames: string[]
  ): Promise<Prisma.TagCreateNestedManyWithoutFoldersInput> {
    return this.repository.prepareTagsConnect(tagNames);
  }

  /**
   * Gets tags from folders that the user owns or is a member of
   */
  async getAvailableTags(user_id: string): Promise<Tag[]> {
    const folders = await this.foldersRepository.getAccessibleFolders(user_id);
    const folderIds = folders.map((folder) => folder.id);
    return this.repository.getTagsFromFolders(folderIds);
  }
}
