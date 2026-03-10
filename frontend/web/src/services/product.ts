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
  const response = await api.get(`products/${id}`);
  return response.data;
}
