import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('insecure')
  getInsecure(): { ok: boolean; msg: string } {
    return { ok: true, msg: 'this is insecure (public)' };
  }

  @Get('secure')
  @UseGuards(AuthGuard) // requires an authenticated session
  getSecure(@Session() session: UserSession): {
    ok: boolean;
    user: UserSession['user'];
  } {
    // session contains user & session info
    return { ok: true, user: session.user };
  }
}
