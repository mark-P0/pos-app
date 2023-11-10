import {
  Product,
  useProductsContext,
} from "@renderer/contexts/ProductsContext.js";
import { C, formatPrice } from "@renderer/utils.js";

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

function TableRow(props: { cells: Array<string | number> }) {
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

function TableEntry(props: { product: Product }) {
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
      <TableRow cells={["", qty, formatPrice(price), formatPrice(subtotal)]} />
    </>
  );
}

export function CartTable() {
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
        <TableRow cells={["Item", "Qty.", "Price", "Subtotal"]} />
      </thead>
      <tbody>
        {products.map((product) => (
          <TableEntry key={product.sku} product={product} />
        ))}

        <RowBreak />
        <tr>
          <td colSpan={4}>
            <hr className="border-t-2 border-black border-dashed" />
          </td>
        </tr>
        <RowBreak />

        <TableRow cells={["Total", totalQty, "", formatPrice(totalPrice)]} />
        <TableRow cells={["Cash", "", "", formatPrice(cash)]} />
        <TableRow cells={["Change", "", "", formatPrice(change)]} />
      </tbody>
    </table>
  );
}
