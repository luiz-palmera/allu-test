"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "../../../types/product";
import { getProducts } from "../../../services/product";
import { ProductCard } from "../../product-card";
import { useCartStore } from "@/stores/cart-store";
import { useProductSearchStore } from "@/stores/product-search-store";

type CatalogPageProps = {
  initialProducts: Product[];
  initialMeta: {
    page?: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    fuzzy?: boolean;
    offset?: number;
  };
};

export function CatalogPage({
  initialProducts,
  initialMeta,
}: CatalogPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialMeta.hasNextPage);
  const [offset, setOffset] = useState(initialProducts.length);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const addProduct = useCartStore((state) => state.addProduct);
  const addingProductId = useCartStore((state) => state.isAddingProductId);

  const searchResults = useProductSearchStore((state) => state.results);
  const query = useProductSearchStore((state) => state.query);
  const isSearching = useProductSearchStore((state) => state.isSearching);
  const fuzzy = useProductSearchStore((state) => state.fuzzy);
  const clearSearch = useProductSearchStore((state) => state.clearSearch);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const isSearchMode = searchResults !== null;
  const visibleProducts = isSearchMode ? searchResults : products;

  async function loadMoreProducts() {
    if (isFetchingMore || !hasMore || isSearchMode) return;

    try {
      setIsFetchingMore(true);

      const response = await getProducts(initialMeta.limit, offset);

      setProducts((prev) => [...prev, ...response.data]);
      setHasMore(response.meta.hasNextPage);
      setOffset((prev) => prev + response.data.length);
    } catch (error) {
      console.error("Erro ao carregar mais produtos:", error);
    } finally {
      setIsFetchingMore(false);
    }
  }

  useEffect(() => {
    if (isSearchMode) return;

    const target = loadMoreRef.current;

    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting) {
          loadMoreProducts();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, offset, isFetchingMore, isSearchMode]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-16">
        <div className="w-full">
          <h1 className="text-start text-2xl font-bold tracking-tight sm:text-3xl">
            Catálogo de produtos
          </h1>

          {isSearchMode && (
            <div className="mt-2 flex items-start justify-between gap-4">
              <div className="text-start text-sm text-muted-foreground">
                <p>
                  Resultados para <span className="font-medium">"{query}"</span>
                  : {visibleProducts.length}
                </p>

                {fuzzy && (
                  <p className="mt-1 text-xs text-accent">
                    Exibindo resultados aproximados para sua busca.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={clearSearch}
                className="cursor-pointer text-sm font-medium text-accent underline underline-offset-4 transition hover:opacity-80"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isSearching ? (
            <div className="col-span-full rounded-md border border-dashed border-border bg-card px-6 py-16 text-center text-muted-foreground">
              Buscando produtos...
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="col-span-full rounded-md border border-dashed border-border bg-card px-6 py-16 text-center text-muted-foreground">
              Nenhum produto encontrado
            </div>
          ) : (
            <>
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addProduct}
                  isAdding={addingProductId === product.id}
                  eagerImage={index < 4}
                />
              ))}

              {!isSearchMode && hasMore && (
                <div
                  ref={loadMoreRef}
                  className="col-span-full flex justify-center py-6 text-sm text-muted-foreground"
                >
                  {isFetchingMore
                    ? "Carregando mais produtos..."
                    : "Role para carregar mais"}
                </div>
              )}

              {!isSearchMode && !hasMore && products.length > 0 && (
                <div className="col-span-full py-6 text-center text-sm text-muted-foreground">
                  Você chegou ao fim da lista.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
