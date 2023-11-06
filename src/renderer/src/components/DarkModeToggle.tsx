import { C } from "@renderer/utils.js";
import { LuMoon, LuSun } from "react-icons/lu";

const { ipcInvoke } = window.api;

export function DarkModeToggle() {
  function toggle() {
    ipcInvoke("dark-mode:toggle");
  }

  const cls = C(
    "relative",
    "overflow-hidden w-12 aspect-square rounded-full",
    "transition hover:bg-cyan-950/10 dark:hover:bg-white/20 active:scale-90",
  );
  return (
    <button className={cls} onClick={toggle}>
      <LuMoon className="absolute top-0 left-0 p-3 text-cyan-400 dark:opacity-100 opacity-0 h-full w-full transition" />
      <LuSun className="absolute top-0 left-0 p-3 text-amber-400 opacity-100 dark:opacity-0 h-full w-full transition" />
    </button>
  );
}
