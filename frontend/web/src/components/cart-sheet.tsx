"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import type { CartResponse } from "../types/cart";
import { formatCurrency } from "../lib/format-currency";
import Image from "next/image";

type CartSheetProps = {
  cart: CartResponse | null;
  onRemoveItem?: (productId: number) => void;
  removingProductId?: number | null;
};

export function CartSheet({
  cart,
  onRemoveItem,
  removingProductId,
}: CartSheetProps) {
  const items = cart?.items ?? [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-accent hover:text-accent"
          title="Carrinho"
        >
          <ShoppingCart className="h-5 w-5" />

          {(cart?.totalItems ?? 0) > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
              {cart?.totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            <div className="text-accent flex gap-2">
              <ShoppingCart />
              Carrinho
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col px-3 pb-4">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
              Seu carrinho está vazio.
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto pr-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      {item.product.photos?.[0] ? (
                        <Image
                          src={item.product.photos[0]}
                          alt={item.product.name}
                          width={72}
                          height={72}
                          className="h-18 w-18 rounded-lg object-contain bg-white"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-18 w-18 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                          Sem imagem
                        </div>
                      )}

                      <p className="text-sm font-medium">{item.product.name}</p>
                    </div>
                    <div className="w-full flex justify-between items-end">
                      <div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Quantidade: {item.quantity}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {formatCurrency(item.totalMonthlyValue)} / mês
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(item.totalAnnualValue)} ao ano
                        </p>
                      </div>
                      <button
                        type="button"
                        title="Remover item"
                        onClick={() => onRemoveItem?.(item.productId)}
                        disabled={removingProductId === item.productId}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-destructive hover:text-destructive disabled:opacity-60"
                      >
                        {removingProductId === item.productId ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Itens</span>
                  <span className="font-medium">{cart?.totalItems ?? 0}</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total mensal</span>
                  <span className="font-semibold text-accent">
                    {formatCurrency(cart?.totalMonthlyAmount ?? 0)}
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total anual</span>
                  <span className="font-medium">
                    {formatCurrency(cart?.totalAnnualAmount ?? 0)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
