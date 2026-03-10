import { getProducts } from "../services/product";
import { CatalogPage } from "../components/pages/catalog-page";

export default async function Home() {
  const response = await getProducts(12, 0);

  return (
    <CatalogPage
      initialProducts={response.data}
      initialMeta={response.meta}
    />
  );
}