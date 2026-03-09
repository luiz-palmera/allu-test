"use client";

import { Search, ShoppingCart } from "lucide-react";

type HeaderProps = {
  cartItemsCount?: number;
};

export function Header({ cartItemsCount = 0 }: HeaderProps) {
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

        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-accent hover:text-accent"
          title="Carrinho"
        >
          <ShoppingCart className="h-5 w-5" />

          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}