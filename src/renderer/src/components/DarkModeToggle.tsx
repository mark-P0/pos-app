import { C } from "@renderer/utils.js";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const { ipcInvoke } = window.api;

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  /** Mirror Electron internal dark mode state as a React state */
  async function reflectDarkModeState() {
    const isDarkMode = await ipcInvoke("dark-mode:getSetting");
    setIsDarkMode(isDarkMode);
  }
  /** Once, initialize React state to that of the current Electron dark mode state */
  useEffect(() => {
    reflectDarkModeState();
  }, []);
  async function toggle() {
    /* Could also just get a return value from the IPC handler and directly set that as state instead */
    await ipcInvoke("dark-mode:toggle");
    reflectDarkModeState();
  }

  const cls = C(
    isDarkMode === null && "hidden", // Hide button if state not initialized yet
    "overflow-hidden w-11 aspect-square rounded-full",
    "transition hover:bg-cyan-950/10 dark:hover:bg-white/20",
  );
  return (
    <button className={cls} onClick={toggle}>
      <LuMoon className="absolute top-0 left-0 p-2 text-cyan-400 dark:opacity-100 opacity-0 h-full w-full transition" />
      <LuSun className="absolute top-0 left-0 p-2 text-amber-400 opacity-100 dark:opacity-0 h-full w-full transition" />
    </button>
  );
}
