import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FolderResponseDto {
  @ApiProperty({ description: 'Folder ID', example: 'folder-id-123' })
  id: string;

  @ApiProperty({ description: 'Folder title', example: 'My Vacation Photos' })
  title: string;

  @ApiPropertyOptional({
    description: 'Folder description',
    example: 'Photos from my summer vacation',
  })
  description?: string | null;

  @ApiProperty({ description: 'Owner user ID', example: 'user-id-123' })
  owner_id: string;

  @ApiProperty({
    description: 'Upload URL',
    example: 'uuid-upload-link',
  })
  upload_url: string;

  @ApiProperty({
    description: 'Download URL',
    example: 'uuid-download-link',
  })
  download_url: string;

  @ApiPropertyOptional({
    description: 'Folder password hash',
  })
  password?: string | null;

  @ApiProperty({
    description: 'Has reached limit flag',
    example: false,
  })
  has_reached_limit: boolean;

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
