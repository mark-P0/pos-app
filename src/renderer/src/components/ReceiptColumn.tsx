import { C, formatPrice } from "@renderer/utils.js";
import { MachineInfo } from "./MachineInfo.js";
import { ProductTable } from "./ProductTable.js";
import { StoreDetails } from "./StoreDetails.js";

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
