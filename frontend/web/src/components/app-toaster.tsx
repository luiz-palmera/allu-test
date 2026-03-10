"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function AppToaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-left"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground shadow-lg",
          title: "text-sm font-semibold text-card-foreground",
          description: "text-sm text-muted-foreground",
          actionButton:
            "rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:brightness-95",
          success:
            "border-accent/30 bg-card text-card-foreground",
          error:
            "border-destructive/30 bg-card text-card-foreground",
          warning:
            "border-yellow-500/30 bg-card text-card-foreground",
          info:
            "border-border bg-card text-card-foreground",
        },
      }}
      {...props}
    />
  );
}