function isString(value: unknown): value is string {
  return typeof value === "string";
}
export function C(...classes: Array<string | boolean | null | undefined>) {
  const strings = classes.filter(isString);
  return strings.join(" ");
}

export const cls$absoluteCenter = C(
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
);
export const cls$scrollbar = C(
  "overflow-y-scroll",
  "scrollbar-thin",
  "scrollbar-track-cyan-950/10 scrollbar-thumb-cyan-950",
  "dark:scrollbar-track-white/10 dark:scrollbar-thumb-white",
);
export const cls$bg = C("bg-white dark:bg-cyan-950");
export const cls$text = C("text-cyan-950 dark:text-white");
export const cls$selection = C(
  /* Inverse of bg and text classes */
  "selection:bg-cyan-950 dark:selection:bg-white",
  "selection:text-white dark:selection:text-cyan-950",
);
export const cls$card = C(
  "border-2 border-cyan-950",
  "dark:border-transparent dark:bg-white/10",
  "rounded-lg",
);
export const cls$interactiveHoverBg = C(
  "hover:bg-cyan-950/10 dark:hover:bg-white/20",
  "focus-visible:bg-cyan-950/10 dark:focus-visible:bg-white/20",
  "focus-within:bg-cyan-950/10 dark:focus-within:bg-white/20",
);
export const cls$button = C("enabled:active:scale-95", "disabled:opacity-50");
export const cls$button$primary = C(
  cls$button,
  "bg-rose-700",
  ...["enabled:hover:bg-rose-600", "enabled:focus-visible:bg-rose-600"],
  "text-white",
);
export const cls$button$secondary = C(
  cls$button,
  "bg-cyan-800",
  ...["enabled:hover:bg-cyan-700", "enabled:focus-visible:bg-cyan-700"],
  "text-white",
);
export const cls$button$icon = C(
  "overflow-hidden w-12 aspect-square rounded-full p-3",
  cls$interactiveHoverBg,
  "active:scale-90",
  "transition",
);
export const cls$outline = C(
  "focus-visible:[&_*]:outline-amber-400",
  "focus-visible:[&_*]:outline", // Removes white "border" (https://stackoverflow.com/a/61971294)
  "focus-visible:[&_*]:outline-4",
  "focus-visible:[&_*]:outline-offset-4",
);
