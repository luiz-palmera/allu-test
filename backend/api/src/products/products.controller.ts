import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll(
        @Query('limit') limit: number = 20,
        @Query('offset') offset: number = 0
    ) {
        return this.productsService.findAll(Number(limit), Number(offset));
    }

    @Get('search')
    search(
        @Query('query') query?: string,
        @Query('category') category?: string,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        return this.productsService.search({
            query,
            category,
            page: Number(page),
            limit: Number(limit)
        });
    }

    @Get('autocomplete')
    autocomplete(@Query('query') query = '') {
        return this.productsService.autocomplete(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productsService.findOne(Number(id));
    }
}

