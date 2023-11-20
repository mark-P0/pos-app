import { Product } from "@renderer/contexts/ProductsContext.js";
import {
  C,
  cls$card,
  cls$interactiveHoverBg,
  cls$scrollbar,
} from "@renderer/utils/classes.js";
import { ComponentProps } from "react";
import { ProductCard } from "./ProductCard.js";

function ProductButton(props: {
  product: Product;
  onClick: ComponentProps<"button">["onClick"];
}) {
  const { product, onClick } = props;

  const cls = C(
    "w-full text-left",
    "px-3 py-2",
    cls$card,
    cls$interactiveHoverBg,
    "active:scale-[.98]",
    "transition",
  );
  return (
    <button className={cls} onClick={onClick}>
      <ProductCard product={product} />
    </button>
  );
}

export function ProductList(props: {
  products: Product[];
  onItemClick: (product: Product) => void;
}) {
  const { products, onItemClick } = props;

  const cls = C(
    ...[cls$scrollbar, "p-3 pt-0"],
    "grid auto-rows-min gap-3",
    "select-none",
  );
  return (
    <ol className={cls}>
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
