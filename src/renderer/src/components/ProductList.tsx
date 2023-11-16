import { useModalContext } from "@renderer/contexts/ModalContext.js";
import {
  Product,
  useProductsContext,
} from "@renderer/contexts/ProductsContext.js";
import {
  C,
  cls$card,
  cls$interactiveHoverBg,
  cls$scrollbar,
} from "@renderer/utils/classes.js";
import { ProductCard } from "./ProductCard.js";
import { QuantityPrompt } from "./QuantityPrompt.js";

function ProductButton(props: { product: Product }) {
  const { product } = props;
  const { showOnModal } = useModalContext();

  function showQuantityPrompt() {
    showOnModal(<QuantityPrompt product={product} />);
  }

  const cls = C(
    "w-full text-left",
    "px-3 py-2",
    cls$card,
    cls$interactiveHoverBg,
    "active:scale-[.98]",
    "transition",
  );
  return (
    <button className={cls} onClick={showQuantityPrompt}>
      <ProductCard product={product} />
    </button>
  );
}

export function ProductList() {
  const { products } = useProductsContext();

  const cls = C(...[cls$scrollbar, "p-3 pt-0"], "grid gap-3", "select-none");
  return (
    <ol className={cls}>
      {products.map((product) => (
        <li key={product.sku}>
          <ProductButton product={product} />
        </li>
      ))}
    </ol>
  );
}
