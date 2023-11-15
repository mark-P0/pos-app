import { useRef } from "react";

const PriceFormatter = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "PHP",
  notation: "standard",
});
export function formatPrice(price: number) {
  return PriceFormatter.format(price);
}

export function createNewRef<T>() {
  const ref = useRef<T | null>(null);
  function accessRef() {
    const value = ref.current;
    if (value === null) {
      throw new Error("Ref possibly not assigned");
    }
    return value;
  }

  return [ref, accessRef] as const;
}
