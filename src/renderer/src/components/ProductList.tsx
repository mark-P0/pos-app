import { useModalContext } from "@renderer/contexts/ModalContext.js";
import {
  Product,
  useProductsContext,
} from "@renderer/contexts/ProductsContext.js";
import { C, classes, formatPrice } from "@renderer/utils.js";

function ProductCard(props: { product: Product }) {
  const { product } = props;
  const { sku, name, category, price } = product;

  const imgUrl = `pos-app:///data/images/${sku}.png`;
  const imgAlt = `Image of product "${name}"`;

  const cls = C(
    "grid-cols-[1fr_4fr_1fr] gap-4",
    ...[
      // "grid", // Makes element full-width
      "inline-grid", // Does not make element full-width
      "align-middle", // Inlining adds space at the bottom
    ],
  );
  return (
    <section className={cls}>
      <img src={imgUrl} alt={imgAlt} />
      <div className="grid gap-1 auto-rows-min">
        <h2 className="text-lg font-head leading-tight">{name}</h2>
        <p className="text-xs uppercase tracking-widest opacity-80 dark:opacity-50">
          {category}
        </p>
      </div>
      <div className="w-full h-full">
        <p className="text-xs tracking-widest text-right font-bold">
          {formatPrice(price)}
        </p>
      </div>
    </section>
  );
}

function QuantityPrompt(props: { product: Product }) {
  const { product } = props;

  const divCls = C("px-3 py-2", classes.card);
  const cls = C(
    "p-3 rounded-lg",
    "w-[60vw]", // 3/5 of full-width
    ...[classes.bgAndtext, classes.selectionBgAndtext],
    "transition",
  );
  return (
    <article className={cls}>
      <div className={divCls}>
        <ProductCard product={product} />
      </div>
    </article>
  );
}

function ProductButton(props: { product: Product }) {
  const { product } = props;
  const { changeContent } = useModalContext();

  function showQuantityPrompt() {
    changeContent(<QuantityPrompt product={product} />);
  }

  const cls = C(
    "w-full text-left",
    "px-3 py-2",
    classes.card,
    classes.interactiveHoverBg,
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

  const cls = C(
    ...[classes.scrollbar, "pr-3 pb-3"],
    "grid gap-3",
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
