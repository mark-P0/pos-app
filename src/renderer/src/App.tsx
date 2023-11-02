import { useEffect } from "react";
import { DarkModeToggle } from "./components/DarkModeToggle.js";
import { C } from "./utils.js";

const { ipcInvoke } = window.api;

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
