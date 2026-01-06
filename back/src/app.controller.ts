import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({ status: 200, description: 'Returns a hello message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('insecure')
  @ApiOperation({ summary: 'Get insecure endpoint (public)' })
  @ApiResponse({
    status: 200,
    description: 'Returns a public message',
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean', example: true },
        msg: { type: 'string', example: 'this is insecure (public)' },
      },
    },
  })
  getInsecure(): { ok: boolean; msg: string } {
    return { ok: true, msg: 'this is insecure (public)' };
  }

  @Get('secure')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get secure endpoint (requires authentication)' })
  @ApiResponse({
    status: 200,
    description: 'Returns user session info',
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean', example: true },
        user: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getSecure(@Session() session: UserSession): {
    ok: boolean;
    user: UserSession['user'];
  } {
    return { ok: true, user: session.user };
  }
}
