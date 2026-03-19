import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFolderDto {
  @ApiPropertyOptional({
    description: 'Title of the folder',
    example: 'My Updated Vacation Photos',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the folder',
    example: 'Updated description',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Password to protect the folder',
    example: 'newSecurePassword123',
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
