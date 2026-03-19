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
  Query,
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
import {
  FoldersError,
  FoldersException,
  FoldersService,
} from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderResponseDto } from './dto/folder-response.dto';
import { GetUserFoldersQueryDto } from './dto/get-user-folders-query.dto';
import { DeleteFoldersDto } from './dto/delete-folders.dto';
import { Folder } from '@prisma/client';

function handleServiceErrors(error: Error): void {
  if (error instanceof FoldersException) {
    if (error.type === FoldersError.FOLDER_NOT_FOUND) {
      throw new NotFoundException('Folder not found');
    } else if (error.type === FoldersError.FORBIDDEN) {
      throw new ForbiddenException('You do not have access to this folder');
    }
  } else {
    console.error('Unexpected error in folders controller:', error);
    throw new InternalServerErrorException(
      error.message || 'An unexpected error occurred'
    );
  }
}

@ApiTags('folder')
@ApiBearerAuth('JWT-auth')
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a folder by ID' })
  @ApiParam({ name: 'id', description: 'Folder ID' })
  @ApiResponse({
    status: 200,
    description: 'Folder found',
    type: FolderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - no access' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getFolderById(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<FolderResponseDto> {
    try {
      return await this.foldersService.getFolderById(id, session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all folders for the current user',
    description: 'Returns folders owned by or shared with the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of folders',
    type: [FolderResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserFolders(
    @Session() session: UserSession,
    @Query() query: GetUserFoldersQueryDto
  ): Promise<FolderResponseDto[]> {
    try {
      return await this.foldersService.getUserFolders(session.user.id, query);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new folder' })
  @ApiBody({ type: CreateFolderDto })
  @ApiResponse({
    status: 201,
    description: 'Folder created',
    type: FolderResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createFolder(
    @Session() session: UserSession,
    @Body() body: CreateFolderDto
  ): Promise<FolderResponseDto> {
    try {
      return await this.foldersService.createFolder(body, session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a folder' })
  @ApiParam({ name: 'id', description: 'Folder ID' })
  @ApiBody({ type: UpdateFolderDto })
  @ApiResponse({
    status: 200,
    description: 'Folder updated',
    type: FolderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not owner' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateFolder(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body() body: UpdateFolderDto
  ): Promise<FolderResponseDto> {
    try {
      return await this.foldersService.updateFolder(id, body, session.user.id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete multiple folders' })
  @ApiBody({ type: DeleteFoldersDto })
  @ApiResponse({
    status: 200,
    description: 'Folders deleted',
    type: [FolderResponseDto],
  })
  @ApiResponse({ status: 404, description: 'One or more folders not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not the owner of one or more folders',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteManyFolders(
    @Session() session: UserSession,
    @Body() body: DeleteFoldersDto
  ): Promise<Folder[]> {
    try {
      return await this.foldersService.deleteManyFolders(
        body.folder_ids,
        session.user.id
      );
    } catch (error) {
      handleServiceErrors(error);
    }
  }

  @Post(':id/refresh-links')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Refresh upload and download links for a folder' })
  @ApiParam({ name: 'id', description: 'Folder ID' })
  @ApiResponse({
    status: 200,
    description: 'Links refreshed',
    type: FolderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not owner' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refreshFolderLinks(
    @Session() session: UserSession,
    @Param('id') id: string
  ): Promise<FolderResponseDto> {
    try {
      return await this.foldersService.refreshFolderLinks(session.user.id, id);
    } catch (error) {
      handleServiceErrors(error);
    }
  }
}
