import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  FoldersError,
  FoldersException,
  FoldersService,
} from './folders.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { Folder } from '@prisma/client';

function handleServiceErrors(error: Error): void {
  if (error instanceof FoldersException) {
    if (error.type === FoldersError.FOLDER_NOT_FOUND) {
      throw new NotFoundException('Folder not found');
    } else if (error.type === FoldersError.FORBIDDEN) {
      throw new ForbiddenException('You do not have access to this folder');
    }
  } else {
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async getFolderById(
    @Session() session: UserSession,
    @Param('id') folder_id: string
  ): Promise<Folder> {
    try {
      return await this.foldersService.getFolderById(
        folder_id,
        session.user.id
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserFolders(@Session() session: UserSession): Promise<Folder[]> {
    try {
      return await this.foldersService.getUserFolders(session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createFolder(
    @Session() session: UserSession,
    @Body() body: { title: string; description?: string; password?: string }
  ): Promise<Folder> {
    try {
      return await this.foldersService.createFolder(body, session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateFolder(
    @Session() session: UserSession,
    @Param('id') user_id: string,
    @Body()
    body: Partial<{ title: string; description?: string; password?: string }>
  ): Promise<Folder> {
    try {
      return await this.foldersService.updateFolder(
        user_id,
        session.user.id,
        body
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Get(':id/refresh-links')
  @UseGuards(AuthGuard)
  async refreshFolderLinks(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<Folder> {
    try {
      return await this.foldersService.refreshFolderLinks(session.user.id, id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteFolder(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<Folder> {
    try {
      return await this.foldersService.deleteFolder(id, session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }
}
