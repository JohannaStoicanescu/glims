import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({
    description: 'ID of the folder to upload media to',
    example: 'folder-id-123',
  })
  folder_id: string;

  @ApiPropertyOptional({
    description: 'Metadata for the media file (JSON string)',
    example: '{"title": "My Photo", "tags": ["vacation", "beach"]}',
  })
  metadata?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Media file to upload',
  })
  file: Express.Multer.File;
}
