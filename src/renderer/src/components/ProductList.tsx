import { useDisplayProductsContext } from "@renderer/contexts/DisplayProducts.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import {
  Product,
  useProductsContext,
} from "@renderer/contexts/ProductsContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import {
  C,
  cls$card,
  cls$interactiveHoverBg,
  cls$scrollbar,
} from "@renderer/utils/classes.js";
import { raise } from "@renderer/utils/stdlib-ext.js";
import { ProductCard } from "./ProductCard.js";
import { QuantityPrompt } from "./QuantityPrompt.js";

function ProductButton(props: { product: Product }) {
  const { product } = props;
  const { showOnModal } = useModalContext();
  const { screen } = useScreenContext();

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
    <button
      className={cls}
      onClick={screen === "pos" ? showQuantityPrompt : undefined}
    >
      <ProductCard product={product} />
    </button>
  );
}

export function ProductList() {
  const { screen } = useScreenContext();
  const { products } =
    screen === "pos"
      ? useProductsContext()
      : screen === "inv-mgmt"
      ? useDisplayProductsContext()
      : raise(`Unsupported screen \`${screen}\` for product list`);

  const cls = C(
    ...[cls$scrollbar, "p-3 pt-0"],
    "grid auto-rows-min gap-3",
    "select-none",
  );
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
