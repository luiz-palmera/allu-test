import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { getMonthlyValue, withPricing } from 'src/common/utils/price.util';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateCart(token: string) {
    this.logger.log(`Loading cart for token=${token}`);

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

    if (existingCart) {
      this.logger.log(`Existing cart found for token=${token}`);
      return existingCart;
    }

    this.logger.log(`No cart found. Creating new cart for token=${token}`);

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
    const quantity = dto.quantity ?? 1;

    this.logger.log(
      `Adding productId=${dto.productId} quantity=${quantity} to cart token=${token}`,
    );

    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      this.logger.warn(
        `Product not found while adding to cart: productId=${dto.productId}`,
      );
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
      this.logger.log(
        `Product already exists in cart. Incrementing quantity for productId=${dto.productId}`,
      );

      await this.prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: dto.productId,
          },
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
    } else {
      this.logger.log(
        `Creating cart item for productId=${dto.productId} in cart token=${token}`,
      );

      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity,
        },
      });
    }

    return this.getCart(token);
  }

  async getCart(token: string) {
    this.logger.log(`Fetching cart contents for token=${token}`);

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
      this.logger.log(`No cart found for token=${token}. Returning empty cart`);

      return {
        token,
        items: [],
        totalItems: 0,
        totalAnnualAmount: 0,
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

    const totalAnnualAmount = Number(
      items.reduce((acc, item) => acc + item.totalAnnualValue, 0).toFixed(2),
    );

    const totalMonthlyAmount = Number(
      items.reduce((acc, item) => acc + item.totalMonthlyValue, 0).toFixed(2),
    );

    this.logger.log(
      `Cart loaded for token=${token}: items=${items.length} totalItems=${totalItems}`,
    );

    return {
      token: cart.token,
      items,
      totalItems,
      totalAnnualAmount,
      totalMonthlyAmount,
    };
  }

  async removeItem(token: string, productId: number) {
    this.logger.log(`Removing productId=${productId} from cart token=${token}`);

    const cart = await this.prisma.cart.findUnique({
      where: { token },
    });

    if (!cart) {
      this.logger.log(
        `Cart not found while removing item. Returning empty cart for token=${token}`,
      );

      return {
        token,
        items: [],
        totalItems: 0,
        totalAnnualAmount: 0,
        totalMonthlyAmount: 0,
      };
    }

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    this.logger.log(
      `ProductId=${productId} removed successfully from cart token=${token}`,
    );

    return this.getCart(token);
  }
}
