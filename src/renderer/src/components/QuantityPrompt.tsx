import { useCartContext } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import { Product } from "@renderer/contexts/ProductsContext.js";
import { State } from "@renderer/utils.js";
import { C, cls$button$secondary, cls$card } from "@renderer/utils/classes.js";
import { ComponentProps, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { ProductCard } from "./ProductCard.js";
import { Prompt } from "./Prompt.js";

function QuantityCounter(props: { product: Product; state?: State<number> }) {
  const { product, state } = props;
  const [qty, setQty] = state ?? useState(0);
  const { sku, stock } = product;
  const { cart, addToCart } = useCartContext();
  const { closeModal } = useModalContext();

  const currentQty = cart.get(sku) ?? 0;
  const min = currentQty * -1;
  const max = stock - currentQty;

  function decrement() {
    setQty(Math.max(min, qty - 1));
  }
  function increment() {
    setQty(Math.min(max, qty + 1));
  }
  function commit() {
    addToCart(sku, qty);
    closeModal();
  }

  const cls$button$counter = C(
    "h-8 aspect-square",
    "grid place-content-center",
    cls$button$secondary,
    "transition",
  );
  const cls$button$commit = C(
    "h-8 w-32",
    "grid place-content-center",
    "border-y-2 border-cyan-800",
    "enabled:hover:bg-rose-700/25 dark:enabled:hover:bg-rose-700/50",
    "enabled:focus-visible:bg-rose-700/25 dark:enabled:focus-visible:bg-rose-700/50",
    "enabled:active:scale-95",
    "disabled:opacity-50",
    "transition",
  );
  return (
    <div className="flex">
      <button
        type="button"
        className={cls$button$counter}
        onClick={decrement}
        disabled={qty === min}
      >
        <LuMinus />
      </button>
      <button
        type="button"
        className={cls$button$commit}
        onClick={commit}
        disabled={qty === 0}
      >
        <span>
          {qty < 0 ? "Remove" : "Add"}{" "}
          <span className="font-bold">{Math.abs(qty)}</span>
        </span>
      </button>
      <button
        type="button"
        className={cls$button$counter}
        onClick={increment}
        disabled={qty === max}
      >
        <LuPlus />
      </button>
    </div>
  );
}

export function QuantityPrompt(props: { product: Product }) {
  const { product } = props;
  const [qty, setQty] = useState(0);
  const { closeModal } = useModalContext();

  const props$counter: ComponentProps<typeof QuantityCounter> = {
    product,
    state: [qty, setQty],
  };
  const cls$div = C("px-3 py-2", cls$card);
  return (
    <Prompt onClose={closeModal}>
      <>How many of this product to add?</>

      <div className={cls$div}>
        <ProductCard product={product} />
      </div>

      <QuantityCounter {...props$counter} />
    </Prompt>
  );
}
