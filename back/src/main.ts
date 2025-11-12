import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: [`${process.env.FRONTEND_HOST}`],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
