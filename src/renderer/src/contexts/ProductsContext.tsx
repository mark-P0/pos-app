import { useEffect, useState } from "react";
import { createNewContext } from "./utils.js";

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

export const [useProductsContext, ProductsProvider] = createNewContext(() => ({
  ...useProducts(),
}));
