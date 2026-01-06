import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MediaResponseDto {
  @ApiProperty({ description: 'Media ID', example: 'media-id-123' })
  id: string;

  @ApiProperty({ description: 'Media type', example: 'image/jpeg' })
  type: string;

  @ApiProperty({ description: 'Storage ID', example: 'storage-id-123' })
  storage_id: string;

  @ApiProperty({ description: 'Folder ID', example: 'folder-id-123' })
  folder_id: string;

  @ApiProperty({ description: 'User ID', example: 'user-id-123' })
  user_id: string;

  @ApiPropertyOptional({
    description: 'Media metadata',
    example: { title: 'My Photo', tags: ['vacation'] },
  })
  metadata?: unknown;

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updated_at: Date;
}
