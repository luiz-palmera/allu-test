import { ProductDetailsPage } from "@/components/pages/product-page";
import { getProductById } from "@/services/product";
import { notFound } from "next/navigation";

type ProductPrageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPrageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  try {
    const product = await getProductById(productId);
    return <ProductDetailsPage product={product} />;
  } catch {
    notFound();
  }
}
