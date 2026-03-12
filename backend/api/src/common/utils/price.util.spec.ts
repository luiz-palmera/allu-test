import { getMonthlyValue, withPricing } from './price.util';

describe('price.util', () => {
  describe('getMonthlyValue', () => {
    it('should calculate monthly value correctly', () => {
      expect(getMonthlyValue(1200)).toBe(100);
    });

    it('should round monthly value to 2 decimal places', () => {
      expect(getMonthlyValue(2508)).toBe(209);
      expect(getMonthlyValue(3828.01)).toBe(319);
    });
  });

  describe('withPricing', () => {
    it('should append monthlyValue to product', () => {
      const product = {
        id: 1,
        name: 'Notebook Teste',
        category: 'Notebook',
        technicalDetails: 'Detalhes',
        annualValue: 2400,
        photos: ['image.jpg'],
        createdAt: new Date(),
      };

      const result = withPricing(product);

      expect(result).toEqual({
        ...product,
        monthlyValue: 200,
      });
    });
  });
});
