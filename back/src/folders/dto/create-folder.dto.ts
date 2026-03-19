import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFolderDto {
  @ApiProperty({
    description: 'Title of the folder',
    example: 'My Vacation Photos',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the folder',
    example: 'Photos from my summer vacation',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Password to protect the folder',
    example: 'securePassword123',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Tags to organize the folder',
    example: ['vacation', 'photos', 'summer'],
    type: [String],
  })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'List of reaction type names or IDs to enable for this folder',
    example: ['like', 'love'],
    type: [String],
  })
  reaction_types?: string[];
}
