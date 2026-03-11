import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista produtos com paginação' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 12,
    description: 'Quantidade de itens por página',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    example: 0,
    description: 'Deslocamento inicial da listagem',
  })
  @ApiOkResponse({
    description: 'Lista de produtos retornada com sucesso',
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: 'Notebook Acer Nitro V RTX 3050 i5 8GB',
            category: 'Notebook',
            technicalDetails:
              'Placa de vídeo RTX 3050 com 6GB, tela 15.6” Full HD 144Hz, SSD 512GB, Intel Core i5 13ª geração, 8GB RAM.',
            annualValue: 2508,
            monthlyValue: 209,
            photos: [
              'https://images.digital.allugator.com/products/example.jpg',
            ],
          },
        ],
        meta: {
          limit: 12,
          offset: 0,
          total: 40,
          hasNextPage: true,
        },
      },
    },
  })
  findAll(@Query('limit') limit = '12', @Query('offset') offset = '0') {
    return this.productsService.findAll(Number(limit), Number(offset));
  }

  @Get('search')
  @ApiOperation({
    summary: 'Busca produtos por nome, categoria ou descrição',
  })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
    example: 'iphone',
    description: 'Texto buscado',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    example: 'Smartphone',
    description: 'Filtro opcional por categoria',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Página atual da busca',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 12,
    description: 'Quantidade de itens por página',
  })
  @ApiOkResponse({
    description: 'Resultado da busca retornado com sucesso',
    schema: {
      example: {
        data: [
          {
            id: 13,
            name: 'iPhone 15 Pro Max 256GB',
            category: 'Smartphone',
            technicalDetails: 'Chip A17 Pro com GPU de 6 núcleos.',
            annualValue: 4558.87,
            monthlyValue: 379.91,
            photos: [
              'https://images.digital.allugator.com/products/iphone-15-pro-max.png',
            ],
          },
        ],
        meta: {
          page: 1,
          limit: 12,
          total: 1,
          hasNextPage: false,
          fuzzy: false,
        },
      },
    },
  })
  search(
    @Query('query') query?: string,
    @Query('category') category?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '12',
  ) {
    return this.productsService.search({
      query,
      category,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Retorna sugestões de autocomplete' })
  @ApiQuery({
    name: 'query',
    required: true,
    type: String,
    example: 'iph',
    description: 'Texto parcial digitado pelo usuário',
  })
  @ApiOkResponse({
    description: 'Sugestões retornadas com sucesso',
    schema: {
      example: {
        suggestions: [
          { type: 'product', value: 'iPhone 15 Pro Max 256GB' },
          { type: 'product', value: 'iPhone 15 Pro 128GB' },
          { type: 'category', value: 'Smartphone' },
        ],
      },
    },
  })
  autocomplete(@Query('query') query: string) {
    return this.productsService.autocomplete(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um produto pelo ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Produto encontrado',
    schema: {
      example: {
        id: 1,
        name: 'Notebook Acer Nitro V RTX 3050 i5 8GB',
        category: 'Notebook',
        technicalDetails:
          'Placa de vídeo RTX 3050 com 6GB, tela 15.6” Full HD 144Hz, SSD 512GB, Intel Core i5 13ª geração, 8GB RAM.',
        annualValue: 2508,
        monthlyValue: 209,
        photos: ['https://images.digital.allugator.com/products/example.jpg'],
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
