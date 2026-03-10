import { Product } from "./product";


export type CartItem = {
    productId: number;
    quantity: number;
    product: Product;
    unitAnnualValue: number;
    unitMonthlyValue: number;
    totalAnnualValue: number;
    totalMonthlyValue: number;
};

export type CartResponse = {
    token: string;
    items: CartItem[];
    totalItems: number;
    totalAnnualAmount: number;
    totalMonthlyAmount: number;
};