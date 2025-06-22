import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  // Enable CORS - Allow all origins for development
  app.enableCors({
    origin: true, // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('API for the futuristic e-commerce system')
    .setVersion('1.0')
    .addTag('products')
    .addTag('orders')
    .addTag('providers')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3001, '0.0.0.0');
  console.log('🚀 Backend server running on http://localhost:3001');
  console.log('🌐 Server accessible from network at http://192.168.1.155:3001');
  console.log('📚 API Documentation available at http://localhost:3001/api/docs');
}
bootstrap();
