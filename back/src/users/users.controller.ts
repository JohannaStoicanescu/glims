import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { UserError, UserException, UsersService } from './users.service';

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
  async getUserById(
    @Param('id') id: string
  ): Promise<{ id: string; name: string; image: string | null }> {
    try {
      const user = await this.usersService.getUserById(id);
      return {
        id: user.id,
        name: user.name,
        image: user.image,
      };
    } catch (error) {
      handleServiceErrors(error as Error);
    }
  }
}
