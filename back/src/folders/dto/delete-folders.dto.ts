import { ApiProperty } from '@nestjs/swagger';

export class DeleteFoldersDto {
  @ApiProperty({
    description: 'Array of folder IDs to delete',
    example: ['176203ab-e423-472d-af7a-ab65b1338d1c', 'd8df355e-44b1-4fdc-8b98-d8d5724a860c'],
    type: [String],
  })
  folder_ids: string[];
}
