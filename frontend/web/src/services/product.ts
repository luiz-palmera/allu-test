import { unstable_cache } from "next/cache";
import { api } from "./api";
import type { Product, ProductsResponse } from "../types/product";

type AutocompleteSuggestion = {
  type: "product" | "category";
  value: string;
};

type AutocompleteResponse = {
  suggestions: AutocompleteSuggestion[];
};

export async function getProducts(
  limit = 12,
  offset = 0,
): Promise<ProductsResponse> {
  const response = await api.get("/products", {
    params: { limit, offset },
  });

  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

const getCachedProduct = unstable_cache(
  async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data as Product;
  },
  ["product-details"],
  { revalidate: 300 },
);

export async function getProductByIdCached(id: number): Promise<Product> {
  return getCachedProduct(id);
}

export async function searchProducts(
  query: string,
  page = 1,
  limit = 12,
): Promise<ProductsResponse> {
  const response = await api.get("/products/search", {
    params: { query, page, limit },
  });

  return response.data;
}

export async function autocompleteProducts(
  query: string,
): Promise<AutocompleteResponse> {
  const response = await api.get("/products/autocomplete", {
    params: { query },
  });

  return response.data;
}

export type { AutocompleteSuggestion, AutocompleteResponse };
