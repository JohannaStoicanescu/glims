import { ApiProperty } from '@nestjs/swagger';

export class CreateReactionDto {
  @ApiProperty({
    description: 'Media ID to react to',
    example: 'media-id-123',
  })
  media_id: string;

  @ApiProperty({
    description: 'Reaction type ID',
    example: 'reaction-type-id-123',
  })
  reaction_type_id: string;
}
