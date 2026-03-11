"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { useCartStore } from "@/stores/cart-store";
import { useProductSearchStore } from "@/stores/product-search-store";

export function Header() {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const cart = useCartStore((state) => state.cart);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const removingProductId = useCartStore((state) => state.removingProductId);

  const query = useProductSearchStore((state) => state.query);
  const suggestions = useProductSearchStore((state) => state.suggestions);
  const setQuery = useProductSearchStore((state) => state.setQuery);
  const loadSuggestions = useProductSearchStore(
    (state) => state.loadSuggestions,
  );
  const submitSearch = useProductSearchStore((state) => state.submitSearch);
  const clearSearch = useProductSearchStore((state) => state.clearSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadSuggestions(query);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query, loadSuggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        useProductSearchStore.setState({ suggestions: [] });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogoClick() {
    clearSearch();
    router.push("/");
  }

  function handleSuggestionClick(value: string) {
    submitSearch(value);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 shadow-xs backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLogoClick();
          }}
          className="group shrink-0 cursor-pointer text-2xl tracking-tight"
          aria-label="Ir para a home e limpar filtros"
        >
          <span className="group-hover:text-accent">allu</span>
          <span className="text-accent group-hover:text-foreground">.</span>
        </Link>

        <div ref={searchContainerRef} className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitSearch();
              }
            }}
            placeholder="Busque por produtos"
            className="h-11 w-full rounded-full border border-border bg-card pr-10 pl-11 text-sm outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {suggestions.length > 0 && query.trim() && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              {suggestions.map((suggestion) => (
                <button
                  key={`${suggestion.type}-${suggestion.value}`}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion.value)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-muted"
                >
                  <span>{suggestion.value}</span>
                  <span className="text-xs uppercase text-muted-foreground">
                    {suggestion.type === "product" ? "Produto" : "Categoria"}
                  </span>
                </button>
              ))}
            </div>
          )}
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
