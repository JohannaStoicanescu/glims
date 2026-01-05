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
import { FileInterceptor } from '@nestjs/platform-express';
import {
  MediaError,
  MediaException,
  MediaService,
} from './media.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { Media } from '@prisma/client';

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

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Get(':id')
  @UseGuards(AuthGuard)
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
  async getUserMedia(
    @Session() session: UserSession,
    @Param('user_id') user_id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<{ data: Media[]; total: number; page: number; limit: number }> {
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
  async getFolderMedia(
    @Session() session: UserSession,
    @Param('folder_id') folder_id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<{ data: Media[]; total: number; page: number; limit: number }> {
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
  async getFolderUserMedia(
    @Session() session: UserSession,
    @Param('folder_id') folder_id: string,
    @Param('user_id') user_id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<{ data: Media[]; total: number; page: number; limit: number }> {
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
      let metadata: any = undefined;
      if (body.metadata) {
        try {
          metadata = JSON.parse(body.metadata);
        } catch (e) {
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
