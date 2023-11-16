import { useAppContext } from "@renderer/contexts/AppContext.js";
import { useCartContext } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import { formatPrice } from "@renderer/utils.js";
import {
  C,
  cls$button$primary,
  cls$button$secondary,
  cls$card,
  cls$interactiveHoverBg,
  cls$scrollbar,
} from "@renderer/utils/classes.js";
import { ChangeEvent, useEffect, useState } from "react";
import { Prompt } from "./Prompt.js";

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

  const cancelCls = C("px-4 py-1", cls$button$secondary, "transition");
  const confirmCls = C("px-4 py-1", cls$button$primary, "transition");
  return (
    <Prompt>
      <>Are you sure you want to reset the current transaction?</>

      <></>

      <>
        <button type="button" className={confirmCls} onClick={confirm}>
          Yes
        </button>
        <button type="button" className={cancelCls} onClick={cancel}>
          No
        </button>
      </>
    </Prompt>
  );
}

function CheckoutPrompt() {
  const { totalCartPrice, pay } = useCartContext();
  const { showOnModal, closeModal } = useModalContext();

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
    cls$card,
    cls$interactiveHoverBg,
    "transition",
  );
  const inputCls = C("px-2 py-1", "bg-transparent");
  const basePayCls = C("px-4 py-1", cls$button$secondary, "transition");
  const confirmCls = C("px-4 py-1", cls$button$primary, "transition");
  return (
    <Prompt onClose={closeModal}>
      <>Enter payment amount:</>

      <label className={labelCls}>
        {currencySymbol}
        <input
          type="number"
          className={inputCls}
          value={amount}
          onChange={updateAmount}
        />
      </label>

      <>
        <button
          type="button"
          className={confirmCls}
          disabled={amount < totalCartPrice}
          onClick={checkout}
        >
          Confirm
        </button>
        <button type="button" className={basePayCls} onClick={setExactAmount}>
          Use exact{" "}
          <span className="font-bold">{formatPrice(totalCartPrice)}</span>
        </button>
      </>
    </Prompt>
  );
}

function PostCheckoutPrompt() {
  const { changeScreen } = useAppContext();
  const { closeModal, makeModalCancellable } = useModalContext();
  const { saveReceiptAsPng, clearCart, regenerateTransactionId } =
    useCartContext();

  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    makeModalCancellable(false);

    async function initializeImgSrc() {
      const url = await saveReceiptAsPng();
      setSrc(url);
    }
    setTimeout(initializeImgSrc, 250);
  }, []);

  function chooseFeature() {
    makeModalCancellable(true);

    newTransaction();
    changeScreen("feature-select");
  }
  function newTransaction() {
    makeModalCancellable(true);

    clearCart();
    closeModal();
    regenerateTransactionId();
  }

  const chooseFeatureCls = C("px-4 py-1", cls$button$secondary, "transition");
  const newTransactionCls = C("px-4 py-1", cls$button$primary, "transition");
  const receiptCls = C("grid place-items-center", cls$scrollbar);
  return (
    <Prompt>
      <>Transaction success!</>

      {src === null ? (
        <p>Printing the receipt...</p>
      ) : (
        <div className={receiptCls}>
          <img src={src} alt="An image of the receipt" />
        </div>
      )}

      <>
        <button
          type="button"
          className={newTransactionCls}
          onClick={newTransaction}
        >
          New Transaction
        </button>
        <button
          type="button"
          className={chooseFeatureCls}
          onClick={chooseFeature}
        >
          Choose Feature
        </button>
      </>
    </Prompt>
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

  const resetCls = C("px-2 py-3", cls$button$secondary, "transition");
  const checkoutCls = C("px-2 py-3", cls$button$primary, "transition");
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
