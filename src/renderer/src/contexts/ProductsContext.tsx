import { useEffect, useState } from "react";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Products = Awaited<ReturnType<typeof ipcInvoke<"db:getAllProducts">>>;
export type Product = Products[number];

function useProducts() {
  const [products, setProducts] = useState<Products>([]);
  useEffect(() => {
    reflectProducts();
  }, []);
  async function reflectProducts() {
    const products = await ipcInvoke("db:getAllProducts");
    setProducts(products);
  }

  const productMap = new Map<Product["sku"], Product>();
  for (const product of products) {
    productMap.set(product.sku, product);
  }

  /* TODO Extract these from database? */
  const categories = Array.from(
    new Set(products.map(({ category }) => category)),
  );

  return { ...{ products, productMap, reflectProducts }, categories };
}

export const [useProductsContext, ProductsProvider] =
  createNewContext(useProducts);
