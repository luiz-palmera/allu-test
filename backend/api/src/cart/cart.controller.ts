import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  private extractCartToken(token?: string) {
    if (!token) {
      throw new BadRequestException('Header x-cart-token é obrigatório');
    }

    return token;
  }

  @Post()
  @ApiOperation({ summary: 'Adiciona um produto ao carrinho' })
  @ApiHeader({
    name: 'x-cart-token',
    required: true,
    description: 'Token do carrinho persistente',
  })
  @ApiBadRequestResponse({
    description: 'Header x-cart-token ausente ou body inválido',
  })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado',
  })
  @ApiOkResponse({
    description: 'Produto adicionado ao carrinho com sucesso',
    schema: {
      example: {
        token: 'abc123-token',
        items: [
          {
            productId: 1,
            quantity: 2,
            unitAnnualValue: 2508,
            unitMonthlyValue: 209,
            totalAnnualValue: 5016,
            totalMonthlyValue: 418,
            product: {
              id: 1,
              name: 'Notebook Acer Nitro V RTX 3050 i5 8GB',
              category: 'Notebook',
            },
          },
        ],
        totalItems: 2,
        totalAnnualAmount: 5016,
        totalMonthlyAmount: 418,
      },
    },
  })
  addItem(
    @Headers('x-cart-token') cartToken: string,
    @Body() dto: AddCartItemDto,
  ) {
    return this.cartService.addItem(this.extractCartToken(cartToken), dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna o carrinho atual pelo token' })
  @ApiHeader({
    name: 'x-cart-token',
    required: true,
    description: 'Token do carrinho persistente',
  })
  @ApiBadRequestResponse({
    description: 'Header x-cart-token ausente',
  })
  @ApiOkResponse({
    description: 'Carrinho retornado com sucesso',
    schema: {
      example: {
        token: 'abc123-token',
        items: [
          {
            productId: 1,
            quantity: 1,
            unitAnnualValue: 2508,
            unitMonthlyValue: 209,
            totalAnnualValue: 2508,
            totalMonthlyValue: 209,
            product: {
              id: 1,
              name: 'Notebook Acer Nitro V RTX 3050 i5 8GB',
              category: 'Notebook',
            },
          },
        ],
        totalItems: 1,
        totalAnnualAmount: 2508,
        totalMonthlyAmount: 209,
      },
    },
  })
  getCart(@Headers('x-cart-token') cartToken: string) {
    return this.cartService.getCart(this.extractCartToken(cartToken));
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remove um item do carrinho pelo productId' })
  @ApiHeader({
    name: 'x-cart-token',
    required: true,
    description: 'Token do carrinho persistente',
  })
  @ApiParam({
    name: 'productId',
    type: Number,
    description: 'ID do produto a ser removido',
    example: 1,
  })
  @ApiBadRequestResponse({
    description: 'Header x-cart-token ausente ou parâmetro inválido',
  })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado no carrinho',
  })
  @ApiOkResponse({
    description: 'Item removido do carrinho com sucesso',
  })
  removeItem(
    @Headers('x-cart-token') cartToken: string,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeItem(
      this.extractCartToken(cartToken),
      productId,
    );
  }
}
