import { ApiPropertyOptional } from '@nestjs/swagger';

export enum SortBy {
  CREATED_AT = 'created_at',
  TITLE = 'title',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetUserFoldersQueryDto {
  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: SortBy,
    example: SortBy.CREATED_AT,
    default: SortBy.CREATED_AT,
  })
  sortBy?: SortBy;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    example: SortOrder.DESC,
    default: SortOrder.DESC,
  })
  sortOrder?: SortOrder;

  @ApiPropertyOptional({
    description: 'Filter by owner ID',
    example: 'user-123',
  })
  owner_id?: string;

  @ApiPropertyOptional({
    description: 'Filter by start date (ISO 8601 format)',
    example: '2024-01-01T00:00:00Z',
  })
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Filter by end date (ISO 8601 format)',
    example: '2024-12-31T23:59:59Z',
  })
  endDate?: string;
}

