import { useCartContext } from "@renderer/contexts/CartContext.js";
import { formatPrice } from "@renderer/utils.js";
import { C, cls$scrollbar, cls$text } from "@renderer/utils/classes.js";
import { CartTable } from "./CartTable.js";
import { MachineInfo } from "./MachineInfo.js";
import { MapTable } from "./MapTable.js";
import { StoreDetails } from "./StoreDetails.js";

function CurtainDialog() {
  const cls = C(
    "absolute z-10 w-full h-full",
    "grid place-content-center",
    "bg-transparent dark:bg-cyan-950/50",
    cls$text,
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

function VATTable() {
  return (
    <MapTable
      mapping={{
        "VATable Sale": formatPrice(0),
        "VAT (12%)": formatPrice(0),
        "VAT-Exempt Sale": formatPrice(0),
        "Zero-Rated Sale": formatPrice(0),
      }}
    />
  );
}
function CustomerTable() {
  return (
    <MapTable
      mapping={{
        "Customer Name": "",
        "Customer TIN": "",
        "Customer Address": "",
        "Business Style": "",
      }}
    />
  );
}

function Receipt() {
  const { isCartEmpty, receiptRef } = useCartContext();

  const cls = C(
    "bg-white shadow-xl",
    "font-mono text-black uppercase text-xs leading-tight",
    "select-none cursor-not-allowed",
    "p-6",
    isCartEmpty && "blur-sm",
    "transition",
  );
  return (
    <section ref={receiptRef} className={cls}>
      <StoreDetails />
      <br />

      <p className="text-center">This serves as your sales invoice</p>
      <br />

      <CartTable />
      <br />

      <VATTable />
      <br />

      <CustomerTable />
      <br />

      <MachineInfo />
      <br />

      <p className="text-center">Thank you for shopping!</p>
    </section>
  );
}

export function ReceiptColumn() {
  const { isCartEmpty } = useCartContext();

  const cls = C("relative", cls$scrollbar, "p-6 pt-0");
  return (
    <figure className={cls}>
      {isCartEmpty && <CurtainDialog />}
      <Receipt />
      <figcaption className="hidden">
        Receipt for the current transaction
      </figcaption>
    </figure>
  );
}
