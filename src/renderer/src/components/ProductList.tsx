import { useCartContext } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import {
  Product,
  useProductsContext,
} from "@renderer/contexts/ProductsContext.js";
import { C, classes, formatPrice } from "@renderer/utils.js";
import { Dispatch, SetStateAction, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

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

function QuantityCounter(props: {
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  sku: Product["sku"];
}) {
  const { qty, setQty, sku } = props;
  const { cart, addToCart } = useCartContext();
  const { changeContent } = useModalContext();

  const min = (cart.get(sku) ?? 0) * -1;

  function decrement() {
    setQty(Math.max(min, qty - 1));
  }
  function increment() {
    setQty(qty + 1);
  }
  function commit() {
    addToCart(sku, qty);
    changeContent(null);
  }

  const buttonCounterCls = C(
    "h-8 aspect-square",
    "grid place-content-center",
    "bg-cyan-800 enabled:hover:bg-cyan-700 enabled:active:scale-95 text-white disabled:opacity-50",
    "transition",
  );
  const commitButtonCls = C(
    "h-8 w-32",
    "grid place-content-center",
    "border-y-2 border-cyan-800",
    "enabled:hover:bg-rose-700/25 dark:enabled:hover:bg-rose-700/50 enabled:active:scale-95 disabled:opacity-50",
    "transition",
  );
  return (
    <form className="flex">
      <button
        type="button"
        className={buttonCounterCls}
        onClick={decrement}
        disabled={qty === min}
      >
        <LuMinus />
      </button>
      <button
        type="button"
        className={commitButtonCls}
        onClick={commit}
        disabled={qty === 0}
      >
        <span>
          {qty < 0 ? "Remove" : "Add"} <span className="font-bold">{qty}</span>
        </span>
      </button>
      <button type="button" className={buttonCounterCls} onClick={increment}>
        <LuPlus />
      </button>
    </form>
  );
}

function QuantityPrompt(props: { product: Product }) {
  const { product } = props;
  const { sku } = product;
  const [qty, setQty] = useState(0);

  /** Copy types of this (e.g. via hover definition) to counter prop type */
  const counterProps = { qty, setQty, sku };

  const divCls = C("px-3 py-2", classes.card);
  const cls = C(
    "select-none",
    "w-[60vw]", // 3/5 of full-width
    "grid gap-3",
    "p-6 rounded-lg",
    ...[classes.bg, classes.text, classes.selection],
    "transition",
  );
  return (
    <article className={cls}>
      <header>
        <h3 className="font-head text-3xl">How many of this product to add?</h3>
      </header>

      <div className={divCls}>
        <ProductCard product={product} />
      </div>

      <footer className="flex justify-end">
        <QuantityCounter {...counterProps} />
      </footer>
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
