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
        return this.productsService.findAll(Number(limit), Number(offset))
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productsService.findOne(Number(id))
    }
}

