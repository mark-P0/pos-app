import { useProductsContext } from "./ProductsContext.js";
import { createNewContext } from "./utils.js";

/** Passthrough for all products */
function useDisplayProducts() {
  const { products } = useProductsContext();

  return { products };
}

export const [useDisplayProductsContext, DisplayProductsProvider] =
  createNewContext(useDisplayProducts);
