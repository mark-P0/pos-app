import { useCartContext } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
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

const cls$button$no = C("px-4 py-1", cls$button$secondary, "transition");
const cls$button$yes = C("px-4 py-1", cls$button$primary, "transition");
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

  return (
    <Prompt>
      <>Are you sure you want to reset the current transaction?</>

      <></>

      <>
        <button type="button" className={cls$button$yes} onClick={confirm}>
          Yes
        </button>
        <button type="button" className={cls$button$no} onClick={cancel}>
          No
        </button>
      </>
    </Prompt>
  );
}

const cls$label = C(
  "grid grid-cols-[auto_1fr] items-center gap-3",
  "p-1 pl-3",
  cls$card,
  cls$interactiveHoverBg,
  "transition",
);
const cls$input = C("px-2 py-1", "bg-transparent");
const cls$confirm = C("px-4 py-1", cls$button$primary, "transition");
const cls$basePay = C("px-4 py-1", cls$button$secondary, "transition");
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

  return (
    <Prompt onClose={closeModal}>
      <>Enter payment amount:</>

      <label className={cls$label}>
        {currencySymbol}
        <input
          type="number"
          className={cls$input}
          value={amount}
          onChange={updateAmount}
        />
      </label>

      <>
        <button
          type="button"
          className={cls$confirm}
          disabled={amount < totalCartPrice}
          onClick={checkout}
        >
          Confirm
        </button>
        <button type="button" className={cls$basePay} onClick={setExactAmount}>
          Use exact{" "}
          <span className="font-bold">{formatPrice(totalCartPrice)}</span>
        </button>
      </>
    </Prompt>
  );
}

const cls$button$feature = C("px-4 py-1", cls$button$secondary, "transition");
const cls$button$new = C("px-4 py-1", cls$button$primary, "transition");
const cls$receipt = C("grid place-items-center", cls$scrollbar);
function PostCheckoutPrompt() {
  const { changeScreen } = useScreenContext();
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

  return (
    <Prompt>
      <>Transaction success!</>

      {src === null ? (
        <p>Printing the receipt...</p>
      ) : (
        <div className={cls$receipt}>
          <img src={src} alt="An image of the receipt" />
        </div>
      )}

      <>
        <button
          type="button"
          className={cls$button$new}
          onClick={newTransaction}
        >
          New Transaction
        </button>
        <button
          type="button"
          className={cls$button$feature}
          onClick={chooseFeature}
        >
          Choose Feature
        </button>
      </>
    </Prompt>
  );
}

const cls$reset = C("px-2 py-3", cls$button$secondary, "transition");
const cls$checkout = C("px-2 py-3", cls$button$primary, "transition");
export function POSButtons() {
  const { isCartEmpty } = useCartContext();
  const { showOnModal } = useModalContext();

  function showResetPrompt() {
    showOnModal(<ResetPrompt />);
  }
  function showCheckoutPrompt() {
    showOnModal(<CheckoutPrompt />);
  }

  return (
    <aside className="grid gap-3 auto-rows-min p-3 pt-0">
      <button
        className={cls$reset}
        disabled={isCartEmpty}
        onClick={showResetPrompt}
      >
        Reset
      </button>
      <button
        className={cls$checkout}
        disabled={isCartEmpty}
        onClick={showCheckoutPrompt}
      >
        Checkout
      </button>
    </aside>
  );
}
