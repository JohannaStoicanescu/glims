import { ApiProperty } from '@nestjs/swagger';
import { ReactionTypeResponseDto } from './reaction-type-response.dto';

class UserInfoDto {
  @ApiProperty({ description: 'User ID', example: 'user-id-123' })
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'User image URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  image?: string;
}

export class ReactionResponseDto {
  @ApiProperty({ description: 'Reaction ID', example: 'reaction-id-123' })
  id: string;

  @ApiProperty({ description: 'Media ID', example: 'media-id-123' })
  media_id: string;

  @ApiProperty({ description: 'Reaction type ID', example: 'reaction-type-id-123' })
  reaction_type_id: string;

  @ApiProperty({
    description: 'Reaction type details',
    type: ReactionTypeResponseDto,
  })
  reaction_type: ReactionTypeResponseDto;

  @ApiProperty({ description: 'User ID', example: 'user-id-123' })
  user_id: string;

  @ApiProperty({
    description: 'User information',
    type: UserInfoDto,
  })
  user: UserInfoDto;

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  updated_at: Date;
}
