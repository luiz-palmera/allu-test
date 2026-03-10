import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AppToaster } from "../components/app-toaster";

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
        {children}
        <AppToaster/>
      </body>
    </html>
  );
}