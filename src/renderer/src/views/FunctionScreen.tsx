import { Screen } from "@renderer/components/Screen.js";
import { useAppContext } from "@renderer/contexts/AppContext.js";
import { C } from "@renderer/utils.js";
import { ButtonHTMLAttributes } from "react";
import { FaCashRegister } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { LuClipboardEdit } from "react-icons/lu";

type HTMLButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function FigureButton(props: {
  Figure: IconType;
  caption: string;
  onClick: HTMLButtonProps["onClick"];
}) {
  const { Figure, caption, onClick } = props;
  const buttonProps: HTMLButtonProps = { onClick };

  const cls = C(
    "grid gap-8 w-full aspect-square p-8 pt-12 rounded-xl",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-white/10 rounded-xl",
    "transition hover:bg-cyan-950/10 dark:hover:bg-white/20 active:scale-95",
  );
  return (
    <button type="button" {...buttonProps}>
      <figure className={cls}>
        <Figure className="w-full h-full p-6" />
        <figcaption className="uppercase tracking-widest">{caption}</figcaption>
      </figure>
    </button>
  );
}

export function FunctionScreen() {
  const { changeScreen } = useAppContext();

  return (
    <Screen withLogoutButton>
      <nav className="grid grid-cols-2 gap-12">
        <FigureButton
          Figure={FaCashRegister}
          caption="Point-of-Sales"
          onClick={() => changeScreen("pos")}
        />
        <FigureButton
          Figure={LuClipboardEdit}
          caption="Inventory Management"
          onClick={() => changeScreen("inv-mgmt")}
        />
      </nav>
    </Screen>
  );
}
