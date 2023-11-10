import { useCartContext } from "@renderer/contexts/CartContext.js";
import { C, formatPrice } from "@renderer/utils.js";
import { CartTable } from "./CartTable.js";
import { MachineInfo } from "./MachineInfo.js";
import { MapTable } from "./MapTable.js";
import { StoreDetails } from "./StoreDetails.js";

function CurtainDialog() {
  const cls = C(
    "absolute z-10 w-full h-full",
    "grid place-content-center",
    "bg-transparent dark:bg-cyan-950/50",
    "text-cyan-950 dark:text-white",
    "transition",
  );
  return (
    <dialog className={cls}>
      <p className="bg-cyan-950/10 px-3 py-2 font-bold">
        Add items to begin transaction
      </p>
    </dialog>
  );
}

function Receipt() {
  const { isCartEmpty } = useCartContext();

  const cls = C(
    "bg-white m-6 mt-0 shadow-xl",
    "font-mono text-black uppercase text-xs leading-tight",
    "select-none cursor-not-allowed",
    "p-6",
    isCartEmpty && "blur-sm",
    "transition",
  );
  return (
    <section className={cls}>
      <StoreDetails />
      <br />

      <p className="text-center">This serves as your sales invoice</p>
      <br />

      <CartTable />
      <br />

      <MapTable
        mapping={{
          "VATable Sale": formatPrice(0),
          "VAT (12%)": formatPrice(0),
          "VAT-Exempt Sale": formatPrice(0),
          "Zero-Rated Sale": formatPrice(0),
        }}
      />
      <br />

      <MapTable
        mapping={{
          "Customer Name": "",
          "Customer TIN": "",
          "Customer Address": "",
          "Business Style": "",
        }}
      />
      <br />

      <MachineInfo />
      <br />

      <p className="text-center">Thank you for shopping!</p>
    </section>
  );
}

export function ReceiptColumn() {
  const { isCartEmpty } = useCartContext();

  const cls = C(
    ...[
      "relative",
      "overflow-y-auto",
      "scrollbar-thin",
      "scrollbar-track-cyan-950/10 scrollbar-thumb-cyan-950",
      "dark:scrollbar-track-white/10 dark:scrollbar-thumb-white",
    ],
  );
  return (
    <div className={cls}>
      {isCartEmpty && <CurtainDialog />}
      <Receipt />
    </div>
  );
}
