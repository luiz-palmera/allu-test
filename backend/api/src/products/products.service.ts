import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { withPricing } from 'src/common/utils/price.util';

type SearchParams = {
  query?: string;
  category?: string;
  page: number;
  limit: number;
};

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(limit: number, offset: number) {
    this.logger.log(`Listing products with limit=${limit} offset=${offset}`);

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prisma.product.count(),
    ]);

    const data = products.map(withPricing);

    this.logger.log(
      `Products listed successfully: returned=${data.length} total=${total}`,
    );

    return {
      data,
      meta: {
        limit,
        offset,
        total,
        hasNextPage: offset + products.length < total,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      this.logger.warn(`Product not found for id=${id}`);
      throw new NotFoundException('Produto não encontrado');
    }

    return withPricing(product);
  }

  async search({ query, category, page, limit }: SearchParams) {
    const skip = (page - 1) * limit;

    const normalizedQuery = query?.trim();
    const normalizedCategory = category?.trim();

    const fuzzyThreshold = 0.15;

    this.logger.log(
      `Searching products query="${normalizedQuery ?? ''}" category="${normalizedCategory ?? ''}" page=${page} limit=${limit}`,
    );

    const where = {
      AND: [
        normalizedQuery
          ? {
              OR: [
                {
                  name: {
                    contains: normalizedQuery,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  technicalDetails: {
                    contains: normalizedQuery,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  category: {
                    contains: normalizedQuery,
                    mode: 'insensitive' as const,
                  },
                },
              ],
            }
          : {},
        normalizedCategory
          ? {
              category: {
                contains: normalizedCategory,
                mode: 'insensitive' as const,
              },
            }
          : {},
      ],
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    if (products.length > 0 || !normalizedQuery) {
      this.logger.log(
        `Search finished without fuzzy: returned=${products.length} total=${total}`,
      );

      return {
        data: products.map(withPricing),
        meta: {
          page,
          limit,
          total,
          hasNextPage: skip + products.length < total,
          fuzzy: false,
        },
      };
    }

    this.logger.log(
      `No direct results found for query="${normalizedQuery}". Falling back to fuzzy search.`,
    );

    const categoryFilter = normalizedCategory
      ? Prisma.sql`AND unaccent(lower(p."category")) LIKE unaccent(lower(${`%${normalizedCategory}%`}))`
      : Prisma.empty;

    const fuzzyProducts = await this.prisma.$queryRaw<Product[]>(
      Prisma.sql`
        SELECT
          p."id",
          p."name",
          p."category",
          p."technicalDetails",
          p."annualValue",
          p."photos",
          p."createdAt"
        FROM "Product" p
        WHERE (
          similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
          OR similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
          OR similarity(unaccent(lower(p."technicalDetails")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
        )
        ${categoryFilter}
        ORDER BY GREATEST(
          similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))),
          similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))),
          similarity(unaccent(lower(p."technicalDetails")), unaccent(lower(${normalizedQuery})))
        ) DESC,
        p."id" ASC
        LIMIT ${limit}
        OFFSET ${skip}
      `,
    );

    const fuzzyCount = await this.prisma.$queryRaw<Array<{ count: bigint }>>(
      Prisma.sql`
        SELECT COUNT(*)::bigint AS count
        FROM "Product" p
        WHERE (
          similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
          OR similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
          OR similarity(unaccent(lower(p."technicalDetails")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
        )
        ${categoryFilter}
      `,
    );

    const fuzzyTotal = Number(fuzzyCount[0]?.count ?? 0);

    this.logger.log(
      `Fuzzy search finished: returned=${fuzzyProducts.length} total=${fuzzyTotal}`,
    );

    return {
      data: fuzzyProducts.map(withPricing),
      meta: {
        page,
        limit,
        total: fuzzyTotal,
        hasNextPage: skip + fuzzyProducts.length < fuzzyTotal,
        fuzzy: true,
      },
    };
  }

  async autocomplete(query: string) {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      this.logger.log('Autocomplete requested with empty query');
      return { suggestions: [] };
    }

    this.logger.log(`Autocomplete requested for query="${normalizedQuery}"`);

    try {
      const [
        productsStartsWith,
        productsContains,
        categoriesStartsWith,
        categoriesContains,
      ] = await Promise.all([
        this.prisma.product.findMany({
          where: {
            name: {
              startsWith: normalizedQuery,
              mode: 'insensitive',
            },
          },
          select: { name: true },
          take: 5,
          distinct: ['name'],
        }),
        this.prisma.product.findMany({
          where: {
            name: {
              contains: normalizedQuery,
              mode: 'insensitive',
            },
          },
          select: { name: true },
          take: 5,
          distinct: ['name'],
        }),
        this.prisma.product.findMany({
          where: {
            category: {
              startsWith: normalizedQuery,
              mode: 'insensitive',
            },
          },
          select: { category: true },
          take: 5,
          distinct: ['category'],
        }),
        this.prisma.product.findMany({
          where: {
            category: {
              contains: normalizedQuery,
              mode: 'insensitive',
            },
          },
          select: { category: true },
          take: 5,
          distinct: ['category'],
        }),
      ]);

      const suggestions = [
        ...productsStartsWith.map((item) => ({
          type: 'product' as const,
          value: item.name,
        })),
        ...categoriesStartsWith.map((item) => ({
          type: 'category' as const,
          value: item.category,
        })),
        ...productsContains.map((item) => ({
          type: 'product' as const,
          value: item.name,
        })),
        ...categoriesContains.map((item) => ({
          type: 'category' as const,
          value: item.category,
        })),
      ];

      const uniqueSuggestions = suggestions.filter(
        (suggestion, index, self) =>
          index ===
          self.findIndex(
            (item) =>
              item.type === suggestion.type && item.value === suggestion.value,
          ),
      );

      if (uniqueSuggestions.length >= 5) {
        this.logger.log(
          `Autocomplete finished without fuzzy: suggestions=${uniqueSuggestions.length}`,
        );

        return {
          suggestions: uniqueSuggestions.slice(0, 8),
        };
      }

      const fuzzyThreshold =
        normalizedQuery.length <= 3
          ? 0.2
          : normalizedQuery.length <= 6
            ? 0.15
            : 0.2;

      const fuzzyProductSuggestions = await this.prisma.$queryRaw<
        Array<{ value: string; score: number }>
      >(Prisma.sql`
        SELECT DISTINCT
          p."name" AS value,
          similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))) AS score
        FROM "Product" p
        WHERE similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
        ORDER BY score DESC, value ASC
        LIMIT 8
      `);

      const fuzzyCategorySuggestions = await this.prisma.$queryRaw<
        Array<{ value: string; score: number }>
      >(Prisma.sql`
        SELECT DISTINCT
          p."category" AS value,
          similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))) AS score
        FROM "Product" p
        WHERE similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))) > ${fuzzyThreshold}
        ORDER BY score DESC, value ASC
        LIMIT 8
      `);

      const fuzzySuggestions = [
        ...fuzzyProductSuggestions.map((item) => ({
          type: 'product' as const,
          value: item.value,
          score: item.score,
        })),
        ...fuzzyCategorySuggestions.map((item) => ({
          type: 'category' as const,
          value: item.value,
          score: item.score,
        })),
      ].sort((a, b) => b.score - a.score || a.value.localeCompare(b.value));

      const mergedSuggestions = [
        ...uniqueSuggestions,
        ...fuzzySuggestions.map((item) => ({
          type: item.type,
          value: item.value,
        })),
      ];

      const finalSuggestions = mergedSuggestions.filter(
        (suggestion, index, self) =>
          index ===
          self.findIndex(
            (item) =>
              item.type === suggestion.type && item.value === suggestion.value,
          ),
      );

      this.logger.log(
        `Autocomplete finished with fuzzy=${fuzzySuggestions.length > 0}: suggestions=${finalSuggestions.length}`,
      );

      return {
        suggestions: finalSuggestions.slice(0, 8),
      };
    } catch (error) {
      this.logger.error(
        `Autocomplete failed for query="${normalizedQuery}"`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }
}
