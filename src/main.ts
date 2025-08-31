import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for specific origins, methods, and headers
  app.enableCors({
    origin: [
      'http://127.0.0.1:5002',
      'http://localhost:5002',
      'http://127.0.0.1:5000',
      'http://localhost:5000',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
