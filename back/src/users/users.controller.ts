import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { UserError, UserException, UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

function handleServiceErrors(error: Error): void {
  if (error instanceof UserException) {
    if (error.type === UserError.USER_NOT_FOUND) {
      throw new NotFoundException('User not found');
    }
  } else {
    console.error('Unexpected error in users controller:', error);
    throw new InternalServerErrorException(
      error.message || 'An unexpected error occurred'
    );
  }
}

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: string): Promise<{
    id: string;
    name: string;
    image: string | null;
    firstName: string | null;
    lastName: string | null;
    newsletter: boolean;
  }> {
    try {
      const user = await this.usersService.getUserById(id);
      return {
        id: user.id,
        name: user.name,
        image: user.image,
        firstName: user.firstName,
        lastName: user.lastName,
        newsletter: user.newsletter,
      };
    } catch (error) {
      handleServiceErrors(error as Error);
    }
  }

  @Patch('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUserProfile(
    @Session() session: UserSession,
    @Body() body: UpdateUserDto
  ): Promise<{
    id: string;
    name: string;
    image: string | null;
    firstName: string | null;
    lastName: string | null;
    newsletter: boolean;
  }> {
    try {
      const user = await this.usersService.updateUserProfile(
        session.user.id,
        body
      );
      return {
        id: user.id,
        name: user.name,
        image: user.image,
        firstName: user.firstName,
        lastName: user.lastName,
        newsletter: user.newsletter,
      };
    } catch (error) {
      handleServiceErrors(error as Error);
    }
  }

  @Post('profile/image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update current user profile image' })
  @ApiResponse({ status: 200, description: 'Profile image updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfileImage(
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File
  ): Promise<{
    id: string;
    name: string;
    image: string | null;
    firstName: string | null;
    lastName: string | null;
    newsletter: boolean;
  }> {
    try {
      if (!file) {
        throw new InternalServerErrorException('File is required');
      }

      const user = await this.usersService.updateProfileImage(
        session.user.id,
        file.buffer,
        file.mimetype
      );

      return {
        id: user.id,
        name: user.name,
        image: user.image,
        firstName: user.firstName,
        lastName: user.lastName,
        newsletter: user.newsletter,
      };
    } catch (error) {
      handleServiceErrors(error as Error);
    }
  }
}
