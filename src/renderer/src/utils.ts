function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function C(...classes: Array<string | boolean | null | undefined>) {
  const strings = classes.filter(isString);
  return strings.join(" ");
}

const PriceFormatter = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "PHP",
  notation: "standard",
});
export function formatPrice(price: number) {
  return PriceFormatter.format(price);
}

export const classes = {
  scrollbar: C(
    "overflow-y-auto",
    "scrollbar-thin",
    "scrollbar-track-cyan-950/10 scrollbar-thumb-cyan-950",
    "dark:scrollbar-track-white/10 dark:scrollbar-thumb-white",
  ),
  interactiveHoverBg: C("hover:bg-cyan-950/10 dark:hover:bg-white/20"),
} as const;
