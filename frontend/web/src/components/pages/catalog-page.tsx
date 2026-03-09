"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "../../types/product";
import { CartResponse } from "../../types/cart";
import { addToCart, fetchCart } from "../../services/cart";
import { ProductCard } from "../product-card";
import { Header } from "../header";

type CatalogPageProps = {
    products: Product[]
};

export function CatalogPage({products}: CatalogPageProps) {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

    const cartItemsCount = useMemo(() => {
        return cart?.totalItems ?? 0;
    }, [cart]);

    useEffect(() => {
        async function loadCart() {
            try {
                const existingCart = await fetchCart();
                setCart(existingCart);
            } catch (error) {
                console.error("Erro ao carregar carrinho:", error);
            }
        }

        loadCart()
    }, [])

    async function handleAddToCart(productId: number) {
        try{ 
            setLoadingProductId(productId);
            const updatedCart = await addToCart(productId, 1);
            setCart(updatedCart);
        } catch (error) {
            console.error("Erro ao adicionar item ao carrinho", error);
        } finally {
            setLoadingProductId(null);
        }
    }

    return(
        <>
            <Header cartItemsCount={cartItemsCount} />

            <main className="min-h-screen bg-background text-foreground">
                <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16 text-center">
                    <span className="mb-4 rounded-full border px-3 py-1 text-sm">
                    Dia 5 — Frontend
                    </span>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Catálogo de produtos
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                    Estrutura inicial do frontend criada com Next.js para integração com a
                    API de produtos e carrinho.
                    </p>

                    <h1> Todos os produtos: {products.length}</h1>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.length === 0 ? (
                        <div className="col-span-2 rounded-md border border-dashed border-border bg-card px-6 py-16 text-center text-muted-foreground">
                        Nenhum produto encontrado
                        </div>
                    ) : (
                        products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            isAdding={loadingProductId === product.id}
                         />
                        ))
                    )}
                    </div>
                </section>
            </main>
        </>
    )
}