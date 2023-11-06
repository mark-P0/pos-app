import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNullableContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Products = Awaited<ReturnType<typeof ipcInvoke<"db:getAllProducts">>>;

type ProductsValues = {
  products: Products;
};
const ProductsContext = createContext<ProductsValues | null>(null);

export function useProductsContext() {
  return useNullableContext({ ProductsContext });
}

export function ProductsProvider(props: PropsWithChildren) {
  const { children } = props;

  const [products, setProducts] = useState<Products>([]);
  useEffect(() => {
    (async () => {
      const products = await ipcInvoke("db:getAllProducts");
      setProducts(products);
    })();
  }, []);

  const values = { products };
  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
}
