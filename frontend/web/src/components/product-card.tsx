"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Loader2, ShoppingCart } from "lucide-react";

import { Product } from "../types/product";
import { formatCurrency } from "../lib/format-currency";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (productId: number) => void;
  isAdding?: boolean;
};

export function ProductCard({
  product,
  onAddToCart,
  isAdding = false,
}: ProductCardProps) {
  const image = product.photos?.[0];

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-md transition hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        aria-label={`Ver detalhes de ${product.name}`}
        className="absolute inset-0 z-10 rounded-xl"
      />

      <button
        type="button"
        title="Adicionar ao carrinho"
        onClick={() => onAddToCart?.(product.id)}
        disabled={isAdding}
        className="cursor-pointer absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md border border-accent bg-card text-accent shadow-sm transition hover:bg-accent hover:text-accent-foreground active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isAdding ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
      </button>

      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-white p-5">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            width={200}
            height={200}
            className="h-auto max-h-40 w-auto object-contain transition duration-300 group-hover:scale-[1.02]"
            unoptimized
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="min-h-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>

        <h2 className="mt-1 min-h-6 truncate text-base font-semibold">
          {product.name}
        </h2>

        <p className="mt-1 min-h-6 truncate text-xs text-muted-foreground">
          {product.technicalDetails}
        </p>

        <div className="mt-auto pt-2 text-start">
          <p className="text-sm text-muted-foreground">parcelas a partir de</p>

          <div className="mt-1 flex items-end gap-1">
            <span className="text-xl font-bold text-accent">
              {formatCurrency(product.monthlyValue)}
            </span>
            <span className="pb-0.5 text-xs text-muted-foreground">/mês</span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            {formatCurrency(product.annualValue)} ao ano
          </p>
        </div>
      </div>
    </div>
  );
}
