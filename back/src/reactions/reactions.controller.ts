import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { ReactionType, Reaction } from '@prisma/client';
import {
  ReactionsService,
  ReactionsError,
  ReactionsException,
} from './reactions.service';
import { ReactionTypeResponseDto } from './dto/reaction-type-response.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionResponseDto } from './dto/reaction-response.dto';

function handleServiceErrors(error: Error): void {
  if (error instanceof ReactionsException) {
    if (error.type === ReactionsError.FOLDER_NOT_FOUND) {
      throw new NotFoundException('Folder not found');
    } else if (error.type === ReactionsError.MEDIA_NOT_FOUND) {
      throw new NotFoundException('Media not found');
    } else if (error.type === ReactionsError.REACTION_NOT_FOUND) {
      throw new NotFoundException('Reaction not found');
    } else if (error.type === ReactionsError.FORBIDDEN) {
      throw new ForbiddenException(
        'You do not have access to this folder'
      );
    } else if (
      error.type === ReactionsError.REACTION_TYPE_NOT_AVAILABLE
    ) {
      throw new BadRequestException(
        'This reaction type is not available for this folder'
      );
    } else if (error.type === ReactionsError.REACTION_ALREADY_EXISTS) {
      throw new BadRequestException('Reaction already exists');
    }
  } else {
    console.error('Unexpected error:', error);
    throw new InternalServerErrorException(
      error.message || 'An unexpected error occurred'
    );
  }
}

@ApiTags('reaction')
@ApiBearerAuth('JWT-auth')
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Get(':folder_id/available')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get available reactions for a folder',
    description:
      'Returns the list of reactions that are enabled for a specific folder. The user must be the owner or a member of the folder.',
  })
  @ApiParam({
    name: 'folder_id',
    description: 'Folder ID',
    example: 'folder-id-123',
  })
  @ApiResponse({
    status: 200,
    description: 'List of available reactions for the folder',
    type: [ReactionTypeResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - user is not owner or member of the folder',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAvailableReactions(
    @Session() session: UserSession,
    @Param('folder_id') folder_id: string
  ): Promise<ReactionType[]> {
    try {
      return await this.reactionsService.getAvailableReactions(
        folder_id,
        session.user.id
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Get('media/:media_id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all reactions for a media item',
    description:
      'Returns all reactions for a specific media item. The user must have access to the folder containing the media.',
  })
  @ApiParam({
    name: 'media_id',
    description: 'Media ID',
    example: 'media-id-123',
  })
  @ApiResponse({
    status: 200,
    description: 'List of reactions for the media',
    type: [ReactionResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Media not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - user does not have access to the folder',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMediaReactions(
    @Session() session: UserSession,
    @Param('media_id') media_id: string
  ): Promise<Reaction[]> {
    try {
      return await this.reactionsService.getMediaReactions(
        media_id,
        session.user.id
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create a reaction on a media item',
    description:
      'Adds a reaction to a media item. The user must have access to the folder containing the media, and the reaction type must be available for that folder.',
  })
  @ApiBody({ type: CreateReactionDto })
  @ApiResponse({
    status: 201,
    description: 'Reaction created successfully',
    type: ReactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Media or folder not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - user does not have access to the folder',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request - reaction type not available or reaction already exists',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createReaction(
    @Session() session: UserSession,
    @Body() body: CreateReactionDto
  ): Promise<Reaction> {
    try {
      return await this.reactionsService.createReaction(
        body.media_id,
        body.reaction_type_id,
        session.user.id
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete a reaction',
    description:
      'Removes a reaction from a media item. The user must have access to the folder containing the media.',
  })
  @ApiParam({
    name: 'id',
    description: 'Reaction ID',
    example: 'reaction-id-123',
  })
  @ApiResponse({
    status: 200,
    description: 'Reaction deleted successfully',
    type: ReactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Reaction not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - user does not have access to the folder',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteReaction(
    @Session() session: UserSession,
    @Param('id') reaction_id: string
  ): Promise<Reaction> {
    try {
      return await this.reactionsService.deleteReaction(
        reaction_id,
        session.user.id
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }
}

