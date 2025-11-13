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
import { FoldersService } from './folders.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { Folder } from '@prisma/client';
import { uuidv4 } from 'better-auth';

function handleServiceErrors(error: Error): void {
  if (error instanceof Error) {
    if (error.message === 'Folder not found') {
      throw new NotFoundException('Folder not found');
    } else if (error.message === 'Not allowed') {
      throw new ForbiddenException('You do not have access to this folder');
    }
  } else {
    throw new InternalServerErrorException('An unexpected error occurred');
  }
  throw error;
}

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) { }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getFolderById(
    @Session() session: UserSession,
    @Param('id') folder_id: string
  ): Promise<Folder> {
    try {
      const folder = await this.foldersService.getFolderById(folder_id, session.user.id);
      return folder;
    } catch (error) {
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserFolders(@Session() session: UserSession): Promise<Folder[]> {
    return this.foldersService.getUserFolders(session.user.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createFolder(
    @Session() session: UserSession,
    @Body() body: { title: string; description?: string; password?: string }
  ): Promise<Folder> {
    const upload_url = uuidv4().format;
    const download_url = uuidv4().format;

    const folderCreationDto = {
      ...body,
      upload_url,
      download_url,
      owner: { connect: { id: session.user.id } },
    };

    return this.foldersService.createFolder(folderCreationDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateFolder(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body()
    body: Partial<{ title: string; description?: string; password?: string }>
  ): Promise<Folder> {
    await this.foldersService.checkFolderOwnership(id, session.user.id);
    return this.foldersService.updateFolder({ where: { id }, data: body });
  }

  @Get(':id/remove-password')
  @UseGuards(AuthGuard)
  async removeFolderPassword(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<Folder> {
    await this.foldersService.checkFolderOwnership(id, session.user.id);
    return this.foldersService.updateFolder({
      where: { id },
      data: { password: null },
    });
  }

  @Get(':id/refresh-links')
  @UseGuards(AuthGuard)
  async refreshFolderLinks(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<Folder> {
    await this.foldersService.checkFolderOwnership(id, session.user.id);

    const upload_url = uuidv4().format;
    const download_url = uuidv4().format;

    return this.foldersService.updateFolder({
      where: { id },
      data: { upload_url, download_url },
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteFolder(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<Folder> {
    await this.foldersService.checkFolderOwnership(id, session.user.id);
    return this.foldersService.deleteFolder({ id });
  }
}
