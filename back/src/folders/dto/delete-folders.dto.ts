import { ApiProperty } from '@nestjs/swagger';

export class DeleteFoldersDto {
  @ApiProperty({
    description: 'Array of folder IDs to delete',
    example: ['folder-id-1', 'folder-id-2', 'folder-id-3'],
    type: [String],
  })
  ids: string[];
}

