import { getProducts } from "../services/product";
import { CatalogPage } from "../components/pages/catalog-page";

export default async function Home() {
  const products = await getProducts(12, 0);

  return <CatalogPage products={products} />;
}
