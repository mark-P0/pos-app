import { useCartContext } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import { C, classes, formatPrice } from "@renderer/utils.js";
import { ChangeEvent, useState } from "react";

function ResetPrompt() {
  const { changeContent } = useModalContext();
  const { clearCart } = useCartContext();

  function cancel() {
    changeContent(null);
  }
  function confirm() {
    clearCart();
    changeContent(null);
  }

  const cancelCls = C("px-4 py-1", classes.button.secondary, "transition");
  const confirmCls = C("px-4 py-1", classes.button.primary, "transition");
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
        <h3 className="font-head text-3xl">
          Are you sure you want to reset the current transaction?
        </h3>
      </header>

      <footer className="ml-auto grid grid-flow-col auto-cols-fr gap-3">
        <button className={cancelCls} onClick={cancel}>
          No
        </button>
        <button className={confirmCls} onClick={confirm}>
          Yes
        </button>
      </footer>
    </article>
  );
}

function CheckoutPrompt() {
  const { totalCartPrice, pay } = useCartContext();
  const { changeContent } = useModalContext();

  const [amount, setAmount] = useState(totalCartPrice);
  function updateAmount(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;

    const newAmount = Number.parseInt(input.value);
    setAmount(Number.isNaN(newAmount) ? 0 : newAmount);
  }

  function setExactAmount() {
    setAmount(totalCartPrice);
  }
  function checkout() {
    pay(amount);
    changeContent(null);
  }

  const currencySymbol = formatPrice(amount)[0];

  const labelCls = C(
    "grid grid-cols-[auto_1fr] items-center gap-3",
    "p-1 pl-3",
    classes.card,
    classes.interactiveHoverBg,
    "transition",
  );
  const inputCls = C("px-2 py-1", "bg-transparent");
  const basePayCls = C("px-4 py-1", classes.button.secondary, "transition");
  const confirmCls = C("px-4 py-1", classes.button.primary, "transition");
  const cls = C(
    "select-none",
    "w-[60vw]", // 3/5 of full-width
    "grid gap-3",
    "p-6 rounded-lg",
    ...[classes.bg, classes.text, classes.selection],
    "transition",
  );
  return (
    <form className={cls}>
      <header>
        <h3 className="font-head text-3xl">Enter payment amount:</h3>
      </header>

      <label className={labelCls}>
        {currencySymbol}
        <input
          type="number"
          className={inputCls}
          value={amount}
          onChange={updateAmount}
        />
      </label>

      <footer className="flex justify-end gap-3">
        <button type="button" className={basePayCls} onClick={setExactAmount}>
          Use exact{" "}
          <span className="font-bold">{formatPrice(totalCartPrice)}</span>
        </button>
        <button
          type="button"
          className={confirmCls}
          disabled={amount < totalCartPrice}
          onClick={checkout}
        >
          Confirm
        </button>
      </footer>
    </form>
  );
}

export function POSButtons() {
  const { isCartEmpty } = useCartContext();
  const { changeContent } = useModalContext();

  function showResetPrompt() {
    changeContent(<ResetPrompt />);
  }
  function showCheckoutPrompt() {
    changeContent(<CheckoutPrompt />);
  }

  const resetCls = C("px-2 py-3", classes.button.secondary, "transition");
  const checkoutCls = C("px-2 py-3", classes.button.primary, "transition");
  return (
    <aside className="grid gap-3 auto-rows-min">
      <button
        className={resetCls}
        disabled={isCartEmpty}
        onClick={showResetPrompt}
      >
        Reset
      </button>
      <button
        className={checkoutCls}
        disabled={isCartEmpty}
        onClick={showCheckoutPrompt}
      >
        Checkout
      </button>
    </aside>
  );
}
