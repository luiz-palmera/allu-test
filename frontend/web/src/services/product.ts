import { unstable_cache } from "next/cache";
import { api } from "./api";
import type { Product, ProductsResponse } from "../types/product";

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
