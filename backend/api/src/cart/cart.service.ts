import { PrismaService } from 'src/prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getMonthlyValue, withPricing } from 'src/common/utils/price.util';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateCart(token: string) {
    const existingCart = await this.prisma.cart.findUnique({
      where: { token },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (existingCart) return existingCart;

    return this.prisma.cart.create({
      data: { token },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async addItem(token: string, dto: AddCartItemDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const cart = await this.getOrCreateCart(token);

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: dto.productId,
          },
        },
        data: {
          quantity: {
            increment: dto.quantity,
          },
        },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });
    }

    return this.getCart(token);
  }

  async getCart(token: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { token },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return {
        token,
        items: [],
        totalItems: 0,
        totalAnualAmount: 0,
        totalMonthlyAmount: 0,
      };
    }

    const items = cart.items.map((item) => {
      const unitAnnualValue = item.product.annualValue;
      const unitMonthlyValue = getMonthlyValue(unitAnnualValue);

      const totalAnnualValue = Number(
        (unitAnnualValue * item.quantity).toFixed(2),
      );

      const totalMonthlyValue = Number(
        (unitMonthlyValue * item.quantity).toFixed(2),
      );

      return {
        productId: item.productId,
        quantity: item.quantity,
        product: withPricing(item.product),
        unitAnnualValue,
        unitMonthlyValue,
        totalAnnualValue,
        totalMonthlyValue,
      };
    });

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const totalAnualAmount = Number(
      items.reduce((acc, item) => acc + item.totalAnnualValue, 0).toFixed(2),
    );

    const totalMonthlyAmount = Number(
      items.reduce((acc, item) => acc + item.totalMonthlyValue, 0).toFixed(2),
    );

    return {
      token: cart.token,
      items,
      totalItems,
      totalAnualAmount,
      totalMonthlyAmount,
    };
  }

  async removeItem(token: string, productId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { token },
    });

    if (!cart) {
      return {
        token,
        items: [],
        totalItems: 0,
        totalAnualAmount: 0,
        totalMonthlyAmount: 0,
      };
    }

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    return this.getCart(token);
  }
}