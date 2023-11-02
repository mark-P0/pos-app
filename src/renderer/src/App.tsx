import { useEffect, useState } from "react";
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

  const icon =
    isDarkMode !== null &&
    (isDarkMode ? <code>dark icon</code> : <code>light icon</code>);

  const cls = C(
    className,
    isDarkMode === null && "hidden", // Hide button if state not initialized yet
    "overflow-hidden w-12 aspect-square rounded-full",
    ...["bg-black/10 text-white", "dark:bg-white/25"],
  );
  return (
    <button className={cls} onClick={toggle}>
      {icon}
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
    ...["bg-white text-cyan-950", "dark:bg-cyan-950 dark:text-white"],
  );
  return (
    <main className={cls}>
      <DarkModeToggle className="absolute right-0 top-0 -translate-x-6 translate-y-6" />
      <section>
        <h1 className="font-head text-6xl font-bold">lorem ipsum dolomite</h1>
        <p className="font-body font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eum
          cumque illo dolor possimus? Ipsum consequatur quas impedit quibusdam
          pariatur quod nostrum sint! Dolore illum deserunt fugit, eius
          doloremque hic.
        </p>
      </section>
    </main>
  );
}
