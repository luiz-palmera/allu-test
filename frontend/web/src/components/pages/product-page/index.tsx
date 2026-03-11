"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Shield,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";

import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format-currency";
import { Button } from "@/components/ui/button";
import { BenefitItem } from "./components/benefit-item";
import { useCartStore } from "@/stores/cart-store";

type ProductDetailsPageProps = {
  product: Product;
};

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addProduct = useCartStore((state) => state.addProduct);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const addingProductId = useCartStore((state) => state.isAddingProductId);
  const isAdding = addingProductId === product.id;

  const selectedImage = product.photos[selectedImageIndex];

  const changeImage = (direction: "left" | "right") => {
    const nextIndex =
      direction === "left"
        ? selectedImageIndex === 0
          ? product.photos.length - 1
          : selectedImageIndex - 1
        : selectedImageIndex === product.photos.length - 1
          ? 0
          : selectedImageIndex + 1;

    setSelectedImageIndex(nextIndex);

    const container = thumbnailsRef.current;
    if (!container) return;

    const thumbWidth = 108;
    container.scrollTo({
      left: nextIndex * thumbWidth,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para o catálogo
      </Link>

      <section className="grid gap-8 rounded-xl bg-card p-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              className="rounded-2xl object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {product.photos.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changeImage("left")}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-background text-muted-foreground transition hover:text-foreground"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div
                ref={thumbnailsRef}
                className="hide-scrollbar flex gap-3 overflow-x-auto scroll-smooth"
              >
                {product.photos.map((photo, index) => {
                  const isActive = selectedImageIndex === index;

                  return (
                    <button
                      key={`${photo}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border bg-white ${
                        isActive
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-border"
                      }`}
                    >
                      <Image
                        src={photo}
                        alt={`${product.name} - imagem ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => changeImage("right")}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-background text-muted-foreground transition hover:text-foreground"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-around gap-4">
          <span className="mb-3 w-fit self-end rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            {product.category}
          </span>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {product.name}
            </h1>

            <p className="text-sm leading-7 text-muted-foreground">
              {product.technicalDetails}
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">ASSINATURA MENSAL</span>
                  <span className="text-xs text-muted-foreground">
                    cobrança recorrente no cartão de crédito ou pix automático
                  </span>
                </div>

                <span className="text-xl font-semibold text-accent">
                  {formatCurrency(product.monthlyValue)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-t pt-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    VALOR ANUAL EQUIVALENTE
                  </span>
                  <span className="text-xs text-muted-foreground">
                    referência total do período de 12 meses
                  </span>
                </div>

                <span className="text-lg font-medium">
                  {formatCurrency(product.annualValue)}
                </span>
              </div>
            </div>

            <Button
              onClick={() => addProduct(product.id)}
              disabled={isAdding}
              className="w-full cursor-pointer gap-2 rounded-lg bg-accent py-6"
            >
              <ShoppingCart className="h-4 w-4" />
              {isAdding ? "Adicionando..." : "Adicionar ao carrinho"}
            </Button>
          </div>

          <div className="flex flex-col gap-3 border-t px-5 pt-3">
            <span className="text-xs text-muted-foreground">
              BENEFÍCIOS E VANTAGENS
            </span>

            <BenefitItem
              text="Proteção contra furto qualificado e roubo"
              icon={Shield}
            />
            <BenefitItem text="Entrega grátis em 10 dias úteis" icon={Truck} />
            <BenefitItem
              text="Pague mês a mês sem comprometer o limite do cartão"
              icon={CreditCard}
            />
            <BenefitItem
              text="Qualidade 100% garantida (produto novo ou semi-novo)"
              icon={Sparkles}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
