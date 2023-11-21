import { Product } from "@renderer/contexts/ProductsContext.js";
import {
  C,
  cls$card,
  cls$interactiveHoverBg,
  cls$scrollbar,
} from "@renderer/utils/classes.js";
import { ComponentProps } from "react";
import { ProductCard } from "./ProductCard.js";

const cls$button = C(
  "w-full text-left",
  "px-3 py-2",
  cls$card,
  cls$interactiveHoverBg,
  "active:scale-[.98]",
  "transition",
);
function ProductButton(props: {
  product: Product;
  onClick: ComponentProps<"button">["onClick"];
}) {
  const { product, onClick } = props;

  return (
    <button className={cls$button} onClick={onClick}>
      <ProductCard product={product} />
    </button>
  );
}

const cls$list = C(
  ...[cls$scrollbar, "p-3 pt-0"],
  "grid auto-rows-min gap-3",
  "select-none",
);
export function ProductList(props: {
  products: Product[];
  onItemClick: (product: Product) => void;
}) {
  const { products, onItemClick } = props;

  return (
    <ol className={cls$list}>
      {products.map((product) => (
        <li key={product.sku}>
          <ProductButton
            product={product}
            onClick={() => onItemClick(product)}
          />
        </li>
      ))}
    </ol>
  );
}
