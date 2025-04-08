
import ProductManager from "@/components/catalog/ProductManager";
import { initialProducts } from "@/data/initialProducts";

const Catalog = () => {
  return <ProductManager initialProducts={initialProducts} />;
};

export default Catalog;
