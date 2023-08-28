import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Produtos')
    .setDescription('Api feita para realizar a criação, manutenção e remoção de produtos.')
    .setVersion('0.1')    
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted: true}));

  await app.listen(3001);
}
bootstrap();
