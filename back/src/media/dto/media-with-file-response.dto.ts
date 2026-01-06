import { ApiProperty } from '@nestjs/swagger';
import { MediaResponseDto } from './media-response.dto';

export class MediaWithFileResponseDto {
  @ApiProperty({
    description: 'Media metadata',
    type: MediaResponseDto,
  })
  media: MediaResponseDto;

  @ApiProperty({
    description: 'Media file buffer',
    type: 'string',
    format: 'binary',
  })
  file: Buffer;

  @ApiProperty({
    description: 'Content type of the media file',
    example: 'image/jpeg',
  })
  contentType: string;
}

