import { CartResponse } from "../types/cart";
import { api } from "./api";


const CART_TOKEN_KEY = 'cart-token';

export function getCartToken() {
    if(typeof window === 'undefined') return null;

    let token = localStorage.getItem(CART_TOKEN_KEY);

    if(!token) {
        token = crypto.randomUUID();
        localStorage.setItem(CART_TOKEN_KEY, token)
    }

    return token
}

export async function fetchCart(): Promise<CartResponse> {
    const token = getCartToken();

    const response = await api.get('/cart', {
        headers: {
            'x-cart-token': token,
        },
    });

    return response.data;
}

export async function addToCart(productId: number, quantity = 1): Promise<CartResponse> {
    const token = getCartToken();

    const response = await api.post(
        '/cart',
        {productId, quantity},
        {
            headers: {
                'x-cart-token': token,
            },
        },
    );

    return response.data;
}