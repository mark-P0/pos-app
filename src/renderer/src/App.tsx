import { useEffect } from "react";
import { C } from "./utils.js";

export function App() {
  useEffect(() => {
    (async () => {
      const { ipcInvoke } = window.api;
      const products = await ipcInvoke("db:getAllProducts");
      console.log({ products });
    })();
  }, []);

  const cls = C("h-screen grid place-items-center", "bg-cyan-950 text-white");
  return (
    <main className={cls}>
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
