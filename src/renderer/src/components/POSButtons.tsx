import { C, classes } from "@renderer/utils.js";

export function POSButtons() {
  const resetCls = C("px-2 py-1", classes.button.secondary, "transition");
  return (
    <form className="grid auto-rows-min">
      <button type="button" className={resetCls}>
        Reset
      </button>
    </form>
  );
}
