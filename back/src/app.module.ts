import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { httpRequestDurationProvider } from './providers/http-request-duration.metric';
import { ResponseTimeMiddleware } from './middleware/response-time.middleware';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [
    AuthModule.forRoot(auth),
    LoggerModule.forRoot(),
    PrometheusModule.register(),
    FoldersModule,
  ],
  controllers: [AppController],
  providers: [AppService, httpRequestDurationProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
