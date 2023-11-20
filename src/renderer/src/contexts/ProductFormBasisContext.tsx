import { useState } from "react";
import { Product } from "./ProductsContext.js";
import { createNewContext } from "./utils.js";

function useBasis() {
  const [product, setProduct] = useState<Product | null>(null);
  function changeProduct(product: Product | null) {
    setProduct(product);
  }

  return { product, changeProduct };
}

export const [useProductFormBasisContext, ProductFormBasisProvider] =
  createNewContext(useBasis);
