import { Screen } from "@renderer/components/Screen.js";
import { C } from "@renderer/utils.js";
import { FaCashRegister } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { LuClipboardEdit } from "react-icons/lu";

function FigureButton(props: { Figure: IconType; caption: string }) {
  const { Figure, caption } = props;

  const cls = C(
    "grid gap-8 w-full aspect-square p-8 pt-12 rounded-xl",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-white/10 rounded-xl",
    "transition hover:bg-cyan-950/10 hover:dark:bg-white/20",
  );
  return (
    <button type="button">
      <figure className={cls}>
        <Figure className="w-full h-full p-6" />
        <figcaption className="uppercase tracking-widest">{caption}</figcaption>
      </figure>
    </button>
  );
}

export function FunctionScreen() {
  return (
    <Screen withLogout>
      <nav className="grid grid-cols-2 gap-12">
        <FigureButton Figure={FaCashRegister} caption="Point-of-Sales" />
        <FigureButton Figure={LuClipboardEdit} caption="Inventory Management" />
      </nav>
    </Screen>
  );
}
