import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaError, MediaException, MediaService } from './media.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { Media } from '@prisma/client';
import { PaginatedMediaResponseDto } from './dto/paginated-media-response.dto';
import { MediaResponseDto } from './dto/media-response.dto';

function handleServiceErrors(error: Error): void {
  if (error instanceof MediaException) {
    if (error.type === MediaError.MEDIA_NOT_FOUND) {
      throw new NotFoundException('Media not found');
    } else if (error.type === MediaError.FORBIDDEN) {
      throw new ForbiddenException('You do not have access to this media');
    } else if (error.type === MediaError.FOLDER_NOT_FOUND) {
      throw new NotFoundException('Folder not found');
    }
  } else {
    console.error('Unexpected error in media controller:', error);
    throw new InternalServerErrorException(
      error.message || 'An unexpected error occurred'
    );
  }
}

@ApiTags('media')
@ApiBearerAuth('JWT-auth')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a media item by ID' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  @ApiResponse({
    status: 200,
    description: 'Media found',
    type: MediaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Media not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - no access' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMediaById(
    @Session() session: UserSession,
    @Param('id') media_id: string
  ): Promise<Media> {
    try {
      return await this.mediaService.getMediaById(media_id, session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Get('user/:user_id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get paginated media for a user' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Paginated media list',
    type: PaginatedMediaResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserMedia(
    @Session() session: UserSession,
    @Param('user_id') user_id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<PaginatedMediaResponseDto> {
    try {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;
      return await this.mediaService.getUserMedia(
        user_id,
        session.user.id,
        pageNum,
        limitNum
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Get('folder/:folder_id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get paginated media for a folder' })
  @ApiParam({ name: 'folder_id', description: 'Folder ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Paginated media list',
    type: PaginatedMediaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - no access' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getFolderMedia(
    @Session() session: UserSession,
    @Param('folder_id') folder_id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<PaginatedMediaResponseDto> {
    try {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;
      return await this.mediaService.getFolderMedia(
        folder_id,
        session.user.id,
        pageNum,
        limitNum
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Get('folder/:folder_id/user/:user_id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get paginated media for a user in a folder' })
  @ApiParam({ name: 'folder_id', description: 'Folder ID' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Paginated media list',
    type: PaginatedMediaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder or user not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - no access' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getFolderUserMedia(
    @Session() session: UserSession,
    @Param('folder_id') folder_id: string,
    @Param('user_id') user_id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<PaginatedMediaResponseDto> {
    try {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;
      return await this.mediaService.getFolderUserMedia(
        folder_id,
        user_id,
        session.user.id,
        pageNum,
        limitNum
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Upload a new media file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Media file to upload',
        },
        folder_id: {
          type: 'string',
          description: 'ID of the folder to upload to',
          example: 'folder-id-123',
        },
        metadata: {
          type: 'string',
          description: 'Optional metadata as JSON string',
          example: '{"title": "My Photo", "tags": ["vacation"]}',
        },
      },
      required: ['file', 'folder_id'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Media created',
    type: MediaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - no access' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createMedia(
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      folder_id: string;
      metadata?: string;
    }
  ): Promise<Media> {
    try {
      if (!file) {
        throw new InternalServerErrorException('File is required');
      }

      // Determine content type from file or default to application/octet-stream
      const contentType = file.mimetype || 'application/octet-stream';

      // Parse metadata if provided as JSON string
      let metadata: unknown = undefined;
      if (body.metadata) {
        try {
          metadata = JSON.parse(body.metadata);
        } catch {
          // If parsing fails, use as-is
          metadata = body.metadata;
        }
      }

      return await this.mediaService.createMedia(
        {
          file: file.buffer,
          type: contentType,
          folder_id: body.folder_id,
          metadata,
        },
        session.user.id
      );
    } catch (error) {
      console.error('Error creating media:', error);
      handleServiceErrors(error);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a media item by ID' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  @ApiResponse({
    status: 200,
    description: 'Media deleted',
    type: MediaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Media not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - no access' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteMedia(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<Media> {
    try {
      return await this.mediaService.deleteMedia(id, session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }
}
