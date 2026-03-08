import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { Tag } from '@prisma/client';
import { TagsService } from './tags.service';
import { TagResponseDto } from './dto/tag-response.dto';

@ApiTags('tags')
@ApiBearerAuth('JWT-auth')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all existing tags' })
  @ApiResponse({
    status: 200,
    description: 'List of all tags',
    type: [TagResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllTags(): Promise<Tag[]> {
    return await this.tagsService.getAllTags();
  }

  @Get('available')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get tags from folders the user owns or is a member of',
  })
  @ApiResponse({
    status: 200,
    description: 'List of available tags',
    type: [TagResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAvailableTags(@Session() session: UserSession): Promise<Tag[]> {
    return await this.tagsService.getAvailableTags(session.user.id);
  }
}
