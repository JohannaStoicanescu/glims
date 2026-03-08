import { ApiProperty } from '@nestjs/swagger';

export class ReactionTypeResponseDto {
  @ApiProperty({
    description: 'Reaction type ID',
    example: 'reaction-type-id-123',
  })
  id: string;

  @ApiProperty({ description: 'Reaction name', example: 'like' })
  name: string;

  @ApiProperty({
    description: 'Reaction SVG icon',
    example: '<svg>...</svg>',
  })
  svg: string;

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
