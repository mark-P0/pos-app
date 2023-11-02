import { C } from "@renderer/utils.js";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const { ipcInvoke } = window.api;

export function DarkModeToggle(props: { className: string }) {
  const { className } = props;

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
    className,
    isDarkMode === null && "hidden", // Hide button if state not initialized yet
    "overflow-hidden w-11 aspect-square rounded-full p-2",
    ...["bg-cyan-950/10 text-cyan-400", "dark:bg-white/25"],
  );
  return (
    <button className={cls} onClick={toggle}>
      <LuMoon className="dark:block hidden h-full w-full" />
      <LuSun className="block dark:hidden h-full w-full" />
    </button>
  );
}
