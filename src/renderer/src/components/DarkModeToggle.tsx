import { C, classes } from "@renderer/utils.js";
import { LuMoon, LuSun } from "react-icons/lu";

const { ipcInvoke } = window.api;

export function DarkModeToggle() {
  function toggle() {
    ipcInvoke("dark-mode:toggle");
  }

  const iconCls = C("absolute top-0 left-0 p-3", "h-full w-full", "transition");
  const darkCls = C(iconCls, "text-cyan-400 dark:opacity-100 opacity-0");
  const lightCls = C(iconCls, "text-amber-400 opacity-100 dark:opacity-0");
  const cls = C(
    "relative",
    "overflow-hidden w-12 aspect-square rounded-full",
    classes.interactiveHoverBg,
    "active:scale-90",
    "transition",
  );
  return (
    <button className={cls} onClick={toggle}>
      <LuMoon className={darkCls} />
      <LuSun className={lightCls} />
    </button>
  );
}
