import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // ✅ Correction du CORS pour autoriser Amplify
  app.enableCors({
    origin: [
      'https://main.d3odbswaxmuyah.amplifyapp.com', // Ton URL de production
      'http://localhost:5173'                      // Ton environnement local
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  const uploadDir = join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadDir));

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Yboost')
    .setDescription("Documentation de l'API pour le bar à cocktail des Yboost")
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Force l'écoute sur toutes les interfaces pour Docker
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
