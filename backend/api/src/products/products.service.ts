import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(limit: number, offset: number){
    return this.prisma.product.findMany({
      take:limit,
      skip: offset
    })
  }

  async findOne(id: number){
    return this.prisma.product.findUnique({
        where:{ id }
    })
  }
}