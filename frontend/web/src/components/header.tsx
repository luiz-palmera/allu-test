"use client";

import { Search } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { useCartStore } from "@/stores/cart-store";

export function Header() {
  const cart = useCartStore((state) => state.cart);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const removingProductId = useCartStore((state) => state.removingProductId);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 shadow-xs backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <div className="group shrink-0 cursor-pointer text-2xl tracking-tight">
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
          onRemoveItem={removeProduct}
          removingProductId={removingProductId}
        />
      </div>
    </header>
  );
}
