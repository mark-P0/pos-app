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
