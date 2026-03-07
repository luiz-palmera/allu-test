import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddCartItemDto } from "./dto/add-cart-item.dto";



@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    private extractCartToken(token?: string){
        if(!token) {
            throw new BadRequestException('Header x-cart-token é obrigatório');
        }

        return token
    }

    @Post()
    addItem(
        @Headers('x-cart-token') cartToken: string,
        @Body() dto: AddCartItemDto,
    ) {
        return this.cartService.addItem(this.extractCartToken(cartToken), dto);
    }

    @Get()
    getCart(@Headers('x-cart-token') cartToken: string) {
        return this.cartService.getCart(this.extractCartToken(cartToken));
    }

    @Delete(':productId')
    removeItem(
        @Headers('x-cart-token') cartToken: string,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return this.cartService.removeItem(
            this.extractCartToken(cartToken),
            productId
        )
    }
}