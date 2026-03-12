import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const prismaMock = {
    product: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $queryRaw: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductsService(prismaMock as any);
  });

  describe('findOne', () => {
    it('should return product with monthlyValue when product exists', async () => {
      prismaMock.product.findUnique.mockResolvedValue({
        id: 1,
        name: 'Produto Teste',
        category: 'Notebook',
        technicalDetails: 'Detalhes técnicos',
        annualValue: 2400,
        photos: ['image.jpg'],
        createdAt: new Date(),
      });

      const result = await service.findOne(1);

      expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(result).toMatchObject({
        id: 1,
        name: 'Produto Teste',
        annualValue: 2400,
        monthlyValue: 200,
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
