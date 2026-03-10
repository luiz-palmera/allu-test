export type Product = {
    id: number;
    name: string;
    category: string;
    technicalDetails: string;
    annualValue: number;
    monthlyValue: number;
    photos: string[];
    createdAt: string;
}

export type ProductsResponse = {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    fuzzy?: boolean;
  };
};