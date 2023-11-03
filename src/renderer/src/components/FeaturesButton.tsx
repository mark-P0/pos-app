import { C } from "@renderer/utils.js";
import { LuLayoutGrid } from "react-icons/lu";

export function FeaturesButton() {
  const cls = C(
    "overflow-hidden w-12 aspect-square rounded-full p-3",
    "transition hover:bg-cyan-950/10 dark:hover:bg-white/20 active:scale-90",
  );
  return (
    <button className={cls}>
      <LuLayoutGrid className="w-full h-full" />
    </button>
  );
}
