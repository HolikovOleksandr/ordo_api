import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port')!;
  const host = configService.get<string>('host')!;

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
  Logger.log(`🦾 Server was running on http://${host}:${port}`, 'Bootstrap');
  Logger.log(`✅ Connecting to database: ${configService.get<string>('db.name')}`, 'Bootstrap');
}

void bootstrap();
