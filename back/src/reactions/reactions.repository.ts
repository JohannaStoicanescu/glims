import { Injectable } from '@nestjs/common';
import { ReactionType, Reaction } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class ReactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Gets all available reactions for a folder
   */
  async getAvailableReactionsForFolder(
    folder_id: string
  ): Promise<ReactionType[]> {
    const folder = await this.prisma.folder.findUnique({
      where: { id: folder_id },
      include: {
        available_reactions: {
          orderBy: { name: 'asc' },
        },
      },
    });

    return folder?.available_reactions || [];
  }

  /**
   * Gets a folder by ID with basic info
   */
  async getFolderById(folder_id: string): Promise<{
    id: string;
    owner_id: string;
    members: { id: string }[];
  } | null> {
    return this.prisma.folder.findUnique({
      where: { id: folder_id },
      select: {
        id: true,
        owner_id: true,
        members: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  /**
   * Gets a media item by ID with folder info
   */
  async getMediaById(media_id: string): Promise<{
    id: string;
    folder: {
      id: string;
      owner_id: string;
      members: { id: string }[];
      available_reactions: { id: string }[];
    };
  } | null> {
    return this.prisma.media.findUnique({
      where: { id: media_id },
      include: {
        folder: {
          select: {
            id: true,
            owner_id: true,
            members: {
              select: {
                id: true,
              },
            },
            available_reactions: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Gets a reaction by ID with media and folder info
   */
  async getReactionById(reaction_id: string): Promise<{
    id: string;
    media: {
      id: string;
      folder: {
        id: string;
        owner_id: string;
        members: { id: string }[];
      };
    };
  } | null> {
    return this.prisma.reaction.findUnique({
      where: { id: reaction_id },
      include: {
        media: {
          include: {
            folder: {
              select: {
                id: true,
                owner_id: true,
                members: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  /**
   * Creates a reaction
   */
  async createReaction(data: {
    media_id: string;
    reaction_type_id: string;
    user_id: string;
  }): Promise<Reaction> {
    return this.prisma.reaction.create({
      data: {
        media_id: data.media_id,
        reaction_type_id: data.reaction_type_id,
        user_id: data.user_id,
      },
    });
  }

  /**
   * Gets a reaction by media_id and user_id
   */
  async getReactionByMediaAndUser(
    media_id: string,
    user_id: string
  ): Promise<Reaction | null> {
    return this.prisma.reaction.findFirst({
      where: {
        media_id,
        user_id,
      },
    });
  }

  /**
   * Gets all reactions for a media item
   */
  async getReactionsByMedia(media_id: string): Promise<Reaction[]> {
    return this.prisma.reaction.findMany({
      where: {
        media_id,
      },
      include: {
        reaction_type: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  /**
   * Deletes a reaction
   */
  async deleteReaction(reaction_id: string): Promise<Reaction> {
    return this.prisma.reaction.delete({
      where: { id: reaction_id },
    });
  }

  /**
   * Gets all available reaction types
   */
  async getAllReactionTypes(): Promise<ReactionType[]> {
    return this.prisma.reactionType.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Gets reaction types by names or IDs
   */
  async getReactionTypesByNamesOrIds(
    identifiers: string[]
  ): Promise<ReactionType[]> {
    return this.prisma.reactionType.findMany({
      where: {
        OR: [{ id: { in: identifiers } }, { name: { in: identifiers } }],
      },
    });
  }
}
