import { C, classes } from "@renderer/utils.js";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const { ipcInvoke } = window.api;

type Status = Awaited<ReturnType<typeof ipcInvoke<"dark-mode:status">>>;
function useStatus() {
  const [, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    reflectStatus();
  }, []);

  async function reflectStatus() {
    const status = await ipcInvoke("dark-mode:status");
    setStatus(status);
  }

  return { reflectStatus };
}

export function DarkModeToggle() {
  const { reflectStatus } = useStatus();

  function toggle() {
    ipcInvoke("dark-mode:cycle");
    reflectStatus();
  }

  const cls = (() => {
    const button = C(
      "relative",
      "overflow-hidden w-12 aspect-square rounded-full",
      classes.interactiveHoverBg,
      "active:scale-90",
      "transition",
    );
    const icon = C("absolute top-0 left-0 p-3", "h-full w-full", "transition");
    const dark = C(icon, "text-cyan-400 dark:opacity-100 opacity-0");
    const light = C(icon, "text-amber-400 opacity-100 dark:opacity-0");

    return { button, icon: { dark, light } };
  })();
  return (
    <button className={cls.button} onClick={toggle}>
      <LuMoon className={cls.icon.dark} />
      <LuSun className={cls.icon.light} />
    </button>
  );
}
