import { useProductsContext } from "@renderer/contexts/ProductsContext.js";
import { C, formatPrice } from "@renderer/utils.js";
import { MachineInfo } from "./MachineInfo.js";
import { StoreDetails } from "./StoreDetails.js";

type Product = ReturnType<typeof useProductsContext>["products"][number];

function sum(...numbers: number[]) {
  let res = 0;
  for (const num of numbers) res += num;
  return res;
}

function RowBreak() {
  return (
    <tr>
      <td>
        <br />
      </td>
    </tr>
  );
}

function ProductTableRow(props: { cells: Array<string | number> }) {
  const { cells } = props;

  return (
    <tr>
      <td>{cells[0]}</td>
      <td>{cells[1]}</td>
      <td>{cells[2]}</td>
      <td>{cells[3]}</td>
    </tr>
  );
}
function ProductTableEntry(props: { product: Product }) {
  const { product } = props;
  const { name, price } = product;

  const qty = 2;
  const subtotal = qty * price;

  return (
    <>
      <tr>
        <td colSpan={4} className="normal-case">
          {name}
        </td>
      </tr>
      <ProductTableRow
        cells={["", qty, formatPrice(price), formatPrice(subtotal)]}
      />
    </>
  );
}
function ProductTable() {
  const { products } = useProductsContext();

  const totalQty = products.length;
  const totalPrice = sum(...products.map(({ price }) => price));
  const cash = totalPrice;
  const change = cash - totalPrice;

  const clsColumnAlignment = C(
    "[&_td:nth-child(1)]:text-left",
    "[&_td:nth-child(2)]:text-center",
    "[&_td:nth-child(3)]:text-left",
    "[&_td:nth-child(4)]:text-right",
  );
  const cls = C("w-full", clsColumnAlignment);
  return (
    <table className={cls}>
      <colgroup>
        <col span={1} className="w-[calc(5/10*100%)]" />
        <col span={1} className="w-[calc(1/10*100%)]" />
        <col span={1} className="w-[calc(2/10*100%)]" />
        <col span={1} className="w-[calc(2/10*100%)]" />
      </colgroup>
      <thead>
        {/* TODO Use `<th>` instead? */}
        <ProductTableRow cells={["Item", "Qty.", "Price", "Subtotal"]} />
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductTableEntry key={product.sku} product={product} />
        ))}

        <RowBreak />
        <tr>
          <td colSpan={4}>
            <hr className="border-t-2 border-black border-dashed" />
          </td>
        </tr>
        <RowBreak />

        <ProductTableRow
          cells={["Total", totalQty, "", formatPrice(totalPrice)]}
        />
        <ProductTableRow cells={["Cash", "", "", formatPrice(cash)]} />
        <ProductTableRow cells={["Change", "", "", formatPrice(change)]} />
      </tbody>
    </table>
  );
}

function MapTableRow(props: { entry: [string, string | number] }) {
  const { entry } = props;
  const [key, value] = entry;

  return (
    <tr>
      <th className="text-left font-normal normal-case">{key}</th>
      <td>:</td>
      <td>{value}</td>
    </tr>
  );
}
function MapTable(props: { mapping: Record<string, string | number> }) {
  const { mapping } = props;

  return (
    <table className="w-full [&_td:nth-child(3)]:text-right">
      <colgroup>
        <col span={1} className="w-[calc(5/12*100%)]" />
        <col span={1} className="w-[calc(1/12*100%)]" />
        <col span={1} className="w-[calc(6/12*100%)]" />
      </colgroup>
      <thead>
        {Object.entries(mapping).map((entry, idx) => (
          <MapTableRow key={idx} entry={entry} />
        ))}
      </thead>
    </table>
  );
}

function Receipt() {
  const cls = C(
    "bg-white m-6 mt-0 shadow-xl",
    "font-mono text-black uppercase text-xs leading-tight",
    "select-none cursor-not-allowed",
    "p-6",
  );
  return (
    <section className={cls}>
      <StoreDetails />
      <br />

      <p className="text-center">This serves as your sales invoice</p>
      <br />

      <ProductTable />
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
