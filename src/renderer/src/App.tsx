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
  return <div className={cls}>Hello, world!</div>;
}
