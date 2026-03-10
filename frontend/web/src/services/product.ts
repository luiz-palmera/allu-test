import { api } from "./api";
import type { ProductsResponse } from "../types/product";

export async function getProducts( limit = 12, offset = 0 ): Promise<ProductsResponse> {
  const response = await api.get("/products", {
    params: { limit, offset },
  });

  return response.data;
}