import { ApiProperty } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty({ description: 'Tag ID', example: 'tag-id-123' })
  id: string;

  @ApiProperty({ description: 'Tag name', example: 'vacation' })
  name: string;

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
