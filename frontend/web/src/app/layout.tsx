import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { AppToaster } from "../components/app-toaster";
import { PageShell } from "@/components/layout/page-shell";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Allu Test",
  description: "Catálogo de produtos e carrinho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={lexendDeca.variable}>
      <body>
        <PageShell>
          {children}
          <AppToaster />
        </PageShell>
      </body>
    </html>
  );
}
