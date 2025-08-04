import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port')!;

  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: (origin, callback) => {
      const allowedOrigins = [`http://178.151.63.250:${port}`, 'http://localhost:3000'];

      !origin || allowedOrigins.includes(origin)
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'));
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Ordo API')
    .setDescription('The Ordo API')
    .setVersion('1.0')
    .addTag('ordo')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.setGlobalPrefix('api');

  await app.listen(port);
  Logger.log(`🦾 Server running successfully`, 'Bootstrap');
  Logger.log(`✅ Connecting to database: ${configService.get<string>('db.name')}`, 'Bootstrap');
}

bootstrap().catch((error) => {
  Logger.error(`❌ Error during bootstrap: ${error.message}`, error.stack, 'Bootstrap');
  process.exit(1);
});
