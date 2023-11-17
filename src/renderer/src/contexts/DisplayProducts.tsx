import { useState } from "react";
import { useProductsContext } from "./ProductsContext.js";
import { createNewContext } from "./utils.js";

/** Passthrough for all products */
function useDisplayProducts() {
  const { products: allProducts, categories } = useProductsContext();
  const products = [...allProducts];

  const sortOrders = ["Ascending", "Descending"] as const;
  type SortOrder = (typeof sortOrders)[number];
  const [sortOrder, setSortOrder] = useState<SortOrder>("Ascending");

  const sortKeys = ["SKU", "Name", "Price", "Category"] as const;
  type SortKey = (typeof sortKeys)[number];
  const [sortKey, setSortKey] = useState<SortKey>("Category");

  type Category = (typeof categories)[number];
  const [category, setCategory] = useState<Set<Category>>(new Set());

  return {
    products,
    ...{ sortOrders, sortOrder, setSortOrder },
    ...{ sortKeys, sortKey, setSortKey },
    ...{ categories, category, setCategory },
  };
}

export const [useDisplayProductsContext, DisplayProductsProvider] =
  createNewContext(useDisplayProducts);
