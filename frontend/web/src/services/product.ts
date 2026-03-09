import { Product } from "../types/product";
import { api } from "./api";


export async function getProducts(limit = 12, offset = 0): Promise<Product[]> {
    const response = await api.get('/products', {
        params: {limit, offset},
    });

    return response.data;
}