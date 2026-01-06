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
}

