"use client";

import { Search, ShoppingCart } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { CartResponse } from "../types/cart";

type HeaderProps = {
  cart: CartResponse | null;
  onRemoveItem?: (productId: number) => void;
  removingProductId?: number | null;
};

export function Header({ cart, onRemoveItem, removingProductId }: HeaderProps) {
  return (
    <header className="sticky top-0 shadow-xs z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <div className="group text-2xl tracking-tight shrink-0 cursor-pointer">
          <span className="group-hover:text-accent">allu</span>
          <span className="text-accent group-hover:text-foreground">.</span>
        </div>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Busque por produtos"
            className="h-11 w-full rounded-full border border-border bg-card pr-4 pl-11 text-sm outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring"
          />
        </div>

        <CartSheet
          cart={cart}
          onRemoveItem={onRemoveItem}
          removingProductId={removingProductId}
        />
      </div>
    </header>
  );
}