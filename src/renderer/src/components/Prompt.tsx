import { C, classes } from "@renderer/utils.js";
import { PropsWithChildren } from "react";

/** Uses first three (3) children to set content; the others are not used */
export function Prompt(props: PropsWithChildren) {
  const { children } = props;
  const title = children?.[0];
  const body = children?.[1];
  const actions = children?.[2];

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
      <header className="font-head text-3xl">{title}</header>
      {body}
      <footer className="flex flex-row-reverse">{actions}</footer>
    </form>
  );
}
