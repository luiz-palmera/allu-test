import { CatalogPage } from "@/components/pages/catalog-page";
import { getProducts } from "../services/product";

export default async function Home() {
  const response = await getProducts(12, 0);

  return (
    <CatalogPage initialProducts={response.data} initialMeta={response.meta} />
  );
}
