import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Allu Fullstack API')
    .setDescription(
      `
API desenvolvida para o desafio técnico fullstack da Allu.

Funcionalidades principais:
- Catálogo de produtos com paginação
- Busca por nome, categoria e descrição
- Fuzzy search para tolerância a erros de digitação
- Autocomplete de produtos e categorias
- Carrinho persistente via x-cart-token
      `,
    )
    .setVersion('1.0.0')
    .addTag('products', 'Operações relacionadas aos produtos')
    .addTag('cart', 'Operações relacionadas ao carrinho')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-cart-token',
        in: 'header',
        description: 'Token do carrinho persistente',
      },
      'x-cart-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
