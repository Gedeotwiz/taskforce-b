import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'https://task-force-silk.vercel.app' 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  
  const config = new DocumentBuilder()
    .setTitle('Task Force API')
    .setDescription('Task force application API in NestJS')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'DoRoll API Documentation',
  });

  const port = 3000; 
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api`);

}

bootstrap();