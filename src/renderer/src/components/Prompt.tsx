import { C, classes } from "@renderer/utils.js";
import { ComponentProps, PropsWithChildren } from "react";
import { LuX } from "react-icons/lu";

function CloseButton(props: ComponentProps<"button">) {
  return (
    <button {...props} type="button" className={classes.button.icon}>
      <LuX className="w-full h-full" />
    </button>
  );
}

/** Uses first three (3) children to set content; the others are not used */
export function Prompt(props: PropsWithChildren<{ onClose?: () => void }>) {
  const { children, onClose } = props;
  const title = children?.[0];
  const body = children?.[1];
  const actions = children?.[2];

  const cls = C(
    "select-none",
    "overflow-hidden h-full",
    "w-[60vw]", // 3/5 of full-width
    "grid gap-3",
    "p-6 rounded-lg",
    ...[classes.bg, classes.text, classes.selection],
    "transition",
  );
  return (
    <form className={cls}>
      <header className="flex justify-between items-center">
        <span className="font-head text-3xl">{title}</span>
        {onClose !== undefined && <CloseButton onClick={onClose} />}
      </header>
      {body}
      <footer className="flex flex-row-reverse gap-3">{actions}</footer>
    </form>
  );
}
