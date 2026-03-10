"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "../../types/product";
import { CartResponse } from "../../types/cart";
import { addToCart, fetchCart, removeFromCart } from "../../services/cart";
import { getProducts } from "../../services/product";
import { ProductCard } from "../product-card";
import { Header } from "../header";
import { toast } from "sonner";

type CatalogPageProps = {
  initialProducts: Product[];
  initialMeta: {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    fuzzy?: boolean;
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

  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const [removingProductId, setRemovingProductId] = useState<number | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadCart() {
      try {
        const existingCart = await fetchCart();
        setCart(existingCart);
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    }

    loadCart();
  }, []);

  async function handleAddToCart(productId: number) {
    try {
      setLoadingProductId(productId);
      const updatedCart = await addToCart(productId, 1);
      setCart(updatedCart);
      toast.success("Produto adicionado ao carrinho", {
        description: "O item foi incluído com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho", error);
    } finally {
      setLoadingProductId(null);
    }
  }

  async function handleRemoveItem(productId: number) {
    try {
      setRemovingProductId(productId);
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart);
      toast.success("Produto removido do carrinho");
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      toast.error("Não foi possível remover o produto");
    } finally {
      setRemovingProductId(null);
    }
  }

  async function loadMoreProducts() {
    if (isFetchingMore || !hasMore) return;

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
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, offset, isFetchingMore]);

  return (
    <>
      <Header
        cart={cart}
        onRemoveItem={handleRemoveItem}
        removingProductId={removingProductId}
      />

      <main className="min-h-screen bg-background text-foreground">
        <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="w-full text-start text-2xl font-bold tracking-tight sm:text-3xl">
            Catálogo de produtos
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.length === 0 ? (
              <div className="col-span-2 rounded-md border border-dashed border-border bg-card px-6 py-16 text-center text-muted-foreground">
                Nenhum produto encontrado
              </div>
            ) : (
              <>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    isAdding={loadingProductId === product.id}
                  />
                ))}

                {hasMore && (
                  <div
                    ref={loadMoreRef}
                    className="col-span-full flex justify-center py-6 text-sm text-muted-foreground"
                  >
                    {isFetchingMore
                      ? "Carregando mais produtos..."
                      : "Role para carregar mais"}
                  </div>
                )}

                {!hasMore && products.length > 0 && (
                  <div className="col-span-full py-6 text-center text-sm text-muted-foreground">
                    Você chegou ao fim da lista.
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}