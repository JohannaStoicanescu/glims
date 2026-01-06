import { ApiProperty } from '@nestjs/swagger';
import { MediaWithFileResponseDto } from './media-with-file-response.dto';

export class PaginatedMediaResponseDto {
  @ApiProperty({
    description: 'Array of media items with files',
    type: [MediaWithFileResponseDto],
  })
  data: MediaWithFileResponseDto[];

  @ApiProperty({
    description: 'Total number of media items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;
}
