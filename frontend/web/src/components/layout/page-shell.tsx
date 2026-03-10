"use client";

import { useEffect } from "react";
import { Header } from "@/components/header";
import { useCartStore } from "@/stores/cart-store";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const fetchCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
