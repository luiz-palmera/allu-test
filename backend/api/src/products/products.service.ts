import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type SearchParams = {
  query?: string;
  category?: string;
  page: number;
  limit: number;
};

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

  async search({query, category, page, limit}: SearchParams) {
    const skip = (page -1) * limit;

    const normalizedQuery = query?.trim();
    const normalizedCategory = category?.trim();

    const where = {
      AND: [
        normalizedQuery
         ? {
            OR: [
              {
                name:{
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
      this.prisma.product.count({where}),
    ]);

    if(products.length > 0 || !normalizedQuery){
      return {
        data: products,
        meta: {
          page,
          limit,
          total,
          hasNextPage: skip + products.length < total,
          fuzzy: false,
        },
      };
    }

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
        similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))) > 0.2
        OR similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))) > 0.2
        OR similarity(unaccent(lower(p."technicalDetails")), unaccent(lower(${normalizedQuery}))) > 0.2
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
        similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))) > 0.2
        OR similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))) > 0.2
        OR similarity(unaccent(lower(p."technicalDetails")), unaccent(lower(${normalizedQuery}))) > 0.2
      )
      ${categoryFilter}
    `,
  );

  const fuzzyTotal = Number(fuzzyCount[0]?.count ?? 0);

  return {
    data: fuzzyProducts,
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
    return {
      suggestions: [],
    };
  }

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
      select: {
        name: true,
      },
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
      select: {
        name: true,
      },
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
      select: {
        category: true,
      },
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
      select: {
        category: true,
      },
      take: 5,
      distinct: ['category'],
    }),
  ]);

  const suggestions = [
    ...productsStartsWith.map((item) => ({
      type: 'product',
      value: item.name,
    })),
    ...categoriesStartsWith.map((item) => ({
      type: 'category',
      value: item.category,
    })),
    ...productsContains.map((item) => ({
      type: 'product',
      value: item.name,
    })),
    ...categoriesContains.map((item) => ({
      type: 'category',
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
    return {
      suggestions: uniqueSuggestions.slice(0, 8),
    };
  }

  const fuzzyThreshold = normalizedQuery.length <= 5 ? 0.1 : 0.2;

  const fuzzySuggestions = await this.prisma.$queryRaw<
    Array<{ type: string; value: string; score: number }>
  >(Prisma.sql`
    SELECT *
    FROM (
      SELECT
        'product' AS type,
        p."name" AS value,
        GREATEST(
          similarity(unaccent(lower(p."name")), unaccent(lower(${normalizedQuery}))),
          similarity(unaccent(lower(p."technicalDetails")), unaccent(lower(${normalizedQuery})))
        ) AS score
      FROM "Product" p

      UNION ALL

      SELECT
        'category' AS type,
        p."category" AS value,
        similarity(unaccent(lower(p."category")), unaccent(lower(${normalizedQuery}))) AS score
      FROM "Product" p
    ) AS suggestions
    WHERE score > ${fuzzyThreshold}
    ORDER BY score DESC, value ASC
    LIMIT 8
  `);

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

  return {
    suggestions: finalSuggestions.slice(0, 8),
  };
}

}