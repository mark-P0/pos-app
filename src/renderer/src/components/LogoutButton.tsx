import { C } from "@renderer/utils.js";
import { LuLogOut } from "react-icons/lu";

export function LogoutButton() {
  const cls = C(
    "overflow-hidden w-12 aspect-square rounded-full p-3",
    "transition hover:bg-cyan-950/10 dark:hover:bg-white/20 active:scale-90",
  );
  return (
    <button className={cls}>
      <LuLogOut className="w-full h-full scale-[-1]" />
    </button>
  );
}
