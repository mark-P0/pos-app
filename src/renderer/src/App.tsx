import { useEffect } from "react";

export function App() {
  useEffect(() => {
    (async () => {
      const { ipcInvoke } = window.api;
      const products = await ipcInvoke("db:getAllProducts");
      console.log({ products });
    })();
  }, []);

  return (
    <div className="h-screen grid place-items-center bg-cyan-950 text-white">
      Hello, world!
    </div>
  );
}
