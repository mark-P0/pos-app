import { C } from "@renderer/utils.js";

function Receipt() {
  const cls = C(
    "bg-white m-6 mt-0 shadow-xl",
    "font-mono text-black uppercase text-xs leading-tight",
    "select-none cursor-not-allowed",
    "p-6",
  );
  return (
    <section className={cls}>
      <h2 className="text-center">Official Receipt</h2>
      <br />

      <p className="text-center">This serves as your sales invoice</p>
      <br />

      <p className="text-red-500 font-bold">[PRODUCT TABLE]</p>
      <p className="text-red-500 font-bold">[total / cash / change]</p>

      <br />

      <p className="text-red-500 font-bold">[VAT breakdown]</p>
      <br />

      <p className="text-red-500 font-bold">[Customer info]</p>
      <br />

      <p className="text-red-500 font-bold">[machine info]</p>
      <br />

      <p className="text-center">Thank you for shopping!</p>

      <div className="h-96">{/* temporary spacer to scroll */}</div>
    </section>
  );
}

export function ReceiptColumn() {
  const cls = C(
    ...[
      "overflow-y-auto",
      "scrollbar-thin",
      "scrollbar-track-cyan-950/10 scrollbar-thumb-cyan-950",
      "dark:scrollbar-track-white/10 dark:scrollbar-thumb-white",
    ],
  );
  return (
    <div className={cls}>
      <Receipt />
    </div>
  );
}
