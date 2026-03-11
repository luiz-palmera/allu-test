import { notFound } from "next/navigation";
import { ProductDetailsPage } from "@/components/pages/product-page";
import { getProductByIdCached } from "@/services/product";
import { Metadata } from "next";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return {
      title: "Produto não encontrado",
    };
  }

  try {
    const product = await getProductByIdCached(productId);

    return {
      title: `Produto: ${product.name}`,
      description: product.technicalDetails,
    };
  } catch {
    return {
      title: "Produto não encontrado",
    };
  }
}

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
