import { Screen } from "@renderer/components/Screen.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import {
  C,
  cls$absolute$center,
  cls$card,
  cls$interactiveHoverBg,
} from "@renderer/utils/classes.js";
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
    "grid gap-8 w-full aspect-square p-8 pt-12",
    cls$card,
    cls$interactiveHoverBg,
    "active:scale-95",
    "transition",
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

export function FeaturesScreen() {
  const { changeScreen } = useScreenContext();

  const cls = C(
    "overflow-hidden",
    "w-max", // Without this, the absolute position properties below will resize the element...
    cls$absolute$center,
    "grid grid-cols-2 gap-12 p-3",
  );
  return (
    <Screen withLogoutButton>
      <nav className={cls}>
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
