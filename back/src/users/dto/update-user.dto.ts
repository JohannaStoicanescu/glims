import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Full name' })
  name?: string;

  @ApiPropertyOptional({ description: 'First name' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'Newsletter subscription' })
  newsletter?: boolean;

  @ApiPropertyOptional({ description: 'Profile image URL' })
  image?: string;

  @ApiPropertyOptional({ description: 'Email address' })
  email?: string;
}
