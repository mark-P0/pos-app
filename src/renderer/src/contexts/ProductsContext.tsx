import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNullableContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Products = Awaited<ReturnType<typeof ipcInvoke<"db:getAllProducts">>>;
export type Product = Products[number];

function useProducts() {
  const [products, setProducts] = useState<Products>([]);
  useEffect(() => {
    (async () => {
      const products = await ipcInvoke("db:getAllProducts");
      setProducts(products);
    })();
  }, []);

  const productMap = new Map<Product["sku"], Product>();
  for (const product of products) {
    productMap.set(product.sku, product);
  }

  return { products, productMap };
}

type ProductsValues = {
  products: Products;
  productMap: Map<Product["sku"], Product>;
};
const ProductsContext = createContext<ProductsValues | null>(null);
export function useProductsContext() {
  return useNullableContext({ ProductsContext });
}
export function ProductsProvider(props: PropsWithChildren) {
  const { children } = props;
  const { products, productMap } = useProducts();

  const values = { products, productMap };
  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
}
