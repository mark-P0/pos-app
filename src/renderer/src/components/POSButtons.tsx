import { useCartContext } from "@renderer/contexts/CartContext.js";
import { C, classes } from "@renderer/utils.js";

export function POSButtons() {
  const { isCartEmpty, clearCart } = useCartContext();

  function reset() {
    clearCart();
  }

  const resetCls = C("px-2 py-1", classes.button.secondary, "transition");
  return (
    <form className="grid auto-rows-min">
      <button
        type="button"
        className={resetCls}
        disabled={isCartEmpty}
        onClick={reset}
      >
        Reset
      </button>
    </form>
  );
}
