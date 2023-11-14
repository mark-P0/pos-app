import { useRef } from "react";

export function raise(msg: string): never {
  throw new Error(msg);
}

export function sum(...numbers: number[]) {
  let res = 0;
  for (const num of numbers) res += num;
  return res;
}

/** https://stackoverflow.com/a/39914235 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

const interactiveHoverBg = C(
  "hover:bg-cyan-950/10 dark:hover:bg-white/20",
  "focus-visible:bg-cyan-950/10 dark:focus-visible:bg-white/20",
);
export const classes = {
  absoluteCenter: C(
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  ),
  scrollbar: C(
    "overflow-y-scroll",
    "scrollbar-thin",
    "scrollbar-track-cyan-950/10 scrollbar-thumb-cyan-950",
    "dark:scrollbar-track-white/10 dark:scrollbar-thumb-white",
  ),
  bg: C("bg-white dark:bg-cyan-950"),
  text: C("text-cyan-950 dark:text-white"),
  selection: C(
    /* Inverse of bg and text classes */
    "selection:bg-cyan-950 dark:selection:bg-white",
    "selection:text-white dark:selection:text-cyan-950",
  ),
  card: C(
    "border-2 border-cyan-950",
    "dark:border-transparent dark:bg-white/10",
    "rounded-lg",
  ),
  interactiveHoverBg,
  button: {
    primary: C(
      "bg-rose-700",
      ...[
        "enabled:hover:bg-rose-600",
        "enabled:focus-visible:bg-rose-600",
        "enabled:active:scale-95",
      ],
      "disabled:opacity-50",
      "text-white",
    ),
    secondary: C(
      "bg-cyan-800",
      ...[
        "enabled:hover:bg-cyan-700",
        "enabled:focus-visible:bg-cyan-700",
        "enabled:active:scale-95",
      ],
      "disabled:opacity-50",
      "text-white",
    ),
    icon: C(
      "overflow-hidden w-12 aspect-square rounded-full p-3",
      interactiveHoverBg,
      "active:scale-90",
      "transition",
    ),
  },
  outline: C(
    "focus-visible:[&_*]:outline-amber-400",
    "focus-visible:[&_*]:outline", // Removes white "border" (https://stackoverflow.com/a/61971294)
    "focus-visible:[&_*]:outline-4",
    "focus-visible:[&_*]:outline-offset-4",
  ),
} as const;
