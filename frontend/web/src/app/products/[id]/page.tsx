import { notFound } from "next/navigation";
import { ProductDetailsPage } from "@/components/pages/product-page";
import { getProductByIdCached } from "@/services/product";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  try {
    const product = await getProductByIdCached(productId);
    return <ProductDetailsPage product={product} />;
  } catch {
    notFound();
  }
}
