import { Injectable } from '@nestjs/common';
import { ReactionType, Reaction } from '@prisma/client';
import { ReactionsRepository } from './reactions.repository';

export enum ReactionsError {
  FOLDER_NOT_FOUND = 'Folder not found',
  FORBIDDEN = 'Not allowed',
  MEDIA_NOT_FOUND = 'Media not found',
  REACTION_NOT_FOUND = 'Reaction not found',
  REACTION_TYPE_NOT_AVAILABLE = 'Reaction type not available for this folder',
  REACTION_ALREADY_EXISTS = 'Reaction already exists',
}

export class ReactionsException extends Error {
  constructor(public readonly type: ReactionsError) {
    super(type);
  }
}

@Injectable()
export class ReactionsService {
  constructor(private readonly repository: ReactionsRepository) {}

  /**
   * Gets available reactions for a folder
   * User must be the owner or a member of the folder
   */
  async getAvailableReactions(
    folder_id: string,
    user_id: string
  ): Promise<ReactionType[]> {
    // Check if user has access to the folder
    await this.checkFolderAccess(folder_id, user_id);

    // Return available reactions for the folder
    return this.repository.getAvailableReactionsForFolder(folder_id);
  }

  /**
   * Creates a reaction on a media item
   * User must have access to the folder containing the media
   * Reaction type must be available for that folder
   */
  async createReaction(
    media_id: string,
    reaction_type_id: string,
    user_id: string
  ): Promise<Reaction> {
    // Get media with folder info
    const media = await this.repository.getMediaById(media_id);
    if (!media) {
      throw new ReactionsException(ReactionsError.MEDIA_NOT_FOUND);
    }

    // Check if user has access to the folder
    await this.checkFolderAccess(media.folder.id, user_id);

    // Check if reaction type is available for this folder
    const availableReactions = media.folder.available_reactions;
    const isAvailable = availableReactions.some(
      (rt) => rt.id === reaction_type_id
    );
    if (!isAvailable) {
      throw new ReactionsException(ReactionsError.REACTION_TYPE_NOT_AVAILABLE);
    }
    // Check if the user already has a reaction on this media
    const existingReaction = await this.repository.getReactionByMediaAndUser(
      media_id,
      user_id
    );
    if (existingReaction) {
      // Remove the existing reaction before creating a new one
      await this.repository.deleteReaction(existingReaction.id);
    }

    // Create the reaction
    return this.repository.createReaction({
      media_id,
      reaction_type_id,
      user_id,
    });
  }

  /**
   * Gets all reactions for a media item
   * User must have access to the folder containing the media
   */
  async getMediaReactions(
    media_id: string,
    user_id: string
  ): Promise<Reaction[]> {
    // Get media with folder info
    const media = await this.repository.getMediaById(media_id);
    if (!media) {
      throw new ReactionsException(ReactionsError.MEDIA_NOT_FOUND);
    }

    // Check if user has access to the folder
    await this.checkFolderAccess(media.folder.id, user_id);

    // Return all reactions for the media
    return this.repository.getReactionsByMedia(media_id);
  }

  /**
   * Deletes a reaction
   * User must have access to the folder containing the media
   */
  async deleteReaction(
    reaction_id: string,
    user_id: string
  ): Promise<Reaction> {
    // Get reaction with media and folder info
    const reaction = await this.repository.getReactionById(reaction_id);
    if (!reaction) {
      throw new ReactionsException(ReactionsError.REACTION_NOT_FOUND);
    }

    // Check if user has access to the folder
    await this.checkFolderAccess(reaction.media.folder.id, user_id);

    // Delete the reaction
    return this.repository.deleteReaction(reaction_id);
  }

  /**
   * Gets all available reaction types
   */
  async getAllReactionTypes(): Promise<ReactionType[]> {
    return this.repository.getAllReactionTypes();
  }

  /**
   * Gets reaction types by names or IDs
   */
  async getReactionTypesByIdentifiers(
    identifiers: string[]
  ): Promise<ReactionType[]> {
    return this.repository.getReactionTypesByNamesOrIds(identifiers);
  }

  /**
   * Checks if a user has access to a folder (owner or member)
   */
  private async checkFolderAccess(
    folder_id: string,
    user_id: string
  ): Promise<void> {
    const folder = await this.repository.getFolderById(folder_id);
    if (!folder) {
      throw new ReactionsException(ReactionsError.FOLDER_NOT_FOUND);
    }

    const isOwner = folder.owner_id === user_id;
    const isMember = folder.members.some((member) => member.id === user_id);

    if (!isOwner && !isMember) {
      throw new ReactionsException(ReactionsError.FORBIDDEN);
    }
  }
}
