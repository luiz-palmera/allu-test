"use client";

import { addToCart, fetchCart, removeFromCart } from "@/services/cart";
import { CartResponse } from "@/types/cart";
import { toast } from "sonner";
import { create } from "zustand";

type CartStore = {
  cart: CartResponse | null;
  isLoading: boolean;
  isAddingProductId: number | null;
  removingProductId: number | null;
  loadCart: () => Promise<void>;
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  isLoading: false,
  isAddingProductId: null,
  removingProductId: null,

  loadCart: async () => {
    set({ isLoading: true });

    try {
      const cart = await fetchCart();
      set({ cart });
    } catch {
      set({ cart: null });
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (productId) => {
    set({ isAddingProductId: productId });

    try {
      await addToCart(productId);
      const cart = await fetchCart();
      set({ cart });
      toast.success("Produto adicionado ao carrinho.");
    } finally {
      set({ isAddingProductId: null });
    }
  },

  removeProduct: async (productId) => {
    set({ removingProductId: productId });

    try {
      await removeFromCart(productId);
      const cart = await fetchCart();
      set({ cart });
    } catch {
      toast.error("Não foi possível remover o produto");
    }
  },
}));
