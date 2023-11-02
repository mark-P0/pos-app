import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { C } from "./utils.js";

const { ipcInvoke } = window.api;

function DarkModeToggle(props: { className: string }) {
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

export function App() {
  useEffect(() => {
    (async () => {
      const products = await ipcInvoke("db:getAllProducts");
      console.log({ products });
    })();
  }, []);

  const cls = C(
    "relative",
    "h-screen grid place-items-center",
    ...[
      ...[
        "bg-white text-cyan-950",
        "selection:bg-cyan-950 selection:text-white",
      ],
      ...[
        "dark:bg-cyan-950 dark:text-white",
        "dark:selection:bg-white dark:selection:text-cyan-950",
      ],
    ],
  );
  return (
    <main className={cls}>
      <DarkModeToggle className="absolute right-0 top-0 -translate-x-6 translate-y-6" />
      <section>
        <h1 className="font-head text-6xl font-bold">lorem ipsum dolomite</h1>
        <p className="font-body font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eum
          cumque illo dolor possimus? Ipsum consequatur quas impedit quibusdam
          pariatur quod nostrum sint! Dolore illum deserunt fugit, eius
          doloremque hic.
        </p>
      </section>
    </main>
  );
}
