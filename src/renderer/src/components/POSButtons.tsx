import { useCartContext } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import { C, classes } from "@renderer/utils.js";

function ResetPrompt() {
  const { changeContent } = useModalContext();

  function cancel() {
    changeContent(null);
  }

  const cancelCls = C("px-4 py-1", classes.button.secondary);
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
      </footer>
    </article>
  );
}

export function POSButtons() {
  const { isCartEmpty } = useCartContext();
  const { changeContent } = useModalContext();

  function showResetPrompt() {
    changeContent(<ResetPrompt />);
  }

  const resetCls = C("px-2 py-1", classes.button.secondary, "transition");
  return (
    <form className="grid auto-rows-min">
      <button
        type="button"
        className={resetCls}
        disabled={isCartEmpty}
        onClick={showResetPrompt}
      >
        Reset
      </button>
    </form>
  );
}
