import { C, classes } from "@renderer/utils.js";

export function Prompt(props: {
  title: string;
  body?: JSX.Element;
  actions: JSX.Element;
}) {
  const { title, body, actions } = props;

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
