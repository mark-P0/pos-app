import { Dispatch, SetStateAction, useRef } from "react";

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

/**
 * Return type of `useState<T>(initializer)`
 *
 * `ReturnType<useState<T>>` only gives an uninitalized version,
 * which attaches `undefined` to the type.
 */
export type State<T> = [T, Dispatch<SetStateAction<T>>];
