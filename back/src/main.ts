import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.enableCors({
    origin: [`http://${process.env.FRONTEND_HOST}`],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
