import { useAppContext } from "@renderer/contexts/AppContext.js";
import { useCartContext } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/Modal2Context.js";
import { C, classes, formatPrice } from "@renderer/utils.js";
import { ChangeEvent, useEffect, useState } from "react";

function ResetPrompt() {
  const { closeModal } = useModalContext();
  const { clearCart } = useCartContext();

  function cancel() {
    closeModal();
  }
  function confirm() {
    clearCart();
    closeModal();
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
  const { showOnModal } = useModalContext();

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
    showOnModal(<PostCheckoutPrompt />);
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

function PostCheckoutPrompt() {
  const { changeScreen } = useAppContext();
  const { closeModal } = useModalContext();
  const { saveReceiptAsPng, clearCart, regenerateTransactionId } =
    useCartContext();

  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    async function initializeImgSrc() {
      const url = await saveReceiptAsPng();
      setSrc(url);
    }
    setTimeout(initializeImgSrc, 250);
  }, []);

  function chooseFeature() {
    newTransaction();
    changeScreen("feature-select");
  }
  function newTransaction() {
    clearCart();
    closeModal();
    regenerateTransactionId();
  }

  const chooseFeatureCls = C(
    "px-4 py-1",
    classes.button.secondary,
    "transition",
  );
  const newTransactionCls = C(
    "px-4 py-1",
    classes.button.primary,
    "transition",
  );
  const receiptCls = C("grid place-items-center", classes.scrollbar);
  const cls = C(
    "select-none",
    "w-[60vw]", // 3/5 of full-width
    "grid gap-3",
    "p-6 rounded-lg",
    ...[classes.bg, classes.text, classes.selection],
    "overflow-hidden",
    "h-full",
    "transition",
  );
  return (
    <form className={cls}>
      <header>
        <h3 className="font-head text-3xl">Transaction success!</h3>
      </header>

      {src === null ? (
        <p>Printing the receipt...</p>
      ) : (
        <div className={receiptCls}>
          <img src={src} alt="An image of the receipt" />
        </div>
      )}

      <footer className="flex justify-end gap-3">
        <button
          type="button"
          className={chooseFeatureCls}
          onClick={chooseFeature}
        >
          Choose Feature
        </button>
        <button
          type="button"
          className={newTransactionCls}
          onClick={newTransaction}
        >
          New Transaction
        </button>
      </footer>
    </form>
  );
}

export function POSButtons() {
  const { isCartEmpty } = useCartContext();
  const { showOnModal } = useModalContext();

  function showResetPrompt() {
    showOnModal(<ResetPrompt />);
  }
  function showCheckoutPrompt() {
    showOnModal(<CheckoutPrompt />);
  }

  const resetCls = C("px-2 py-3", classes.button.secondary, "transition");
  const checkoutCls = C("px-2 py-3", classes.button.primary, "transition");
  return (
    <aside className="grid gap-3 auto-rows-min p-3 pt-0">
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
