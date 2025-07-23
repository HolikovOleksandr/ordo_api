import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port')!;

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
  Logger.log(`🦾 Running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(`✅ Connecting to database: ${configService.get<string>('db.name')}`, 'Bootstrap');
}

void bootstrap();
