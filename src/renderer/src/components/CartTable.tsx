import { useCartContext } from "@renderer/contexts/CartContext.js";
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

function raise(msg: string): never {
  throw new Error(msg);
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
  const { sku, name, price } = product;
  const { cart } = useCartContext();

  const qty = cart.get(sku) ?? raise(`Product SKU "${sku}" not found in cart`);
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
  const { cart } = useCartContext();
  const { productMap } = useProductsContext();
  const products = Array.from(
    cart.keys(),
    (sku) => productMap.get(sku) ?? raise(`Unknown SKU on cart "${sku}"`),
  );

  const cartProductPricesAndQty = Array.from(cart.entries(), ([sku, qty]) => {
    const price =
      productMap.get(sku)?.price ?? raise(`Unknown SKU on cart "${sku}"`);
    return [price, qty];
  });
  const totalQty = sum(...cart.values());
  const totalPrice = sum(
    ...cartProductPricesAndQty.map(([price, qty]) => price * qty),
  );
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
        <col span={1} className="w-[calc(4/12*100%)]" />
        <col span={1} className="w-[calc(2/12*100%)]" />
        <col span={1} className="w-[calc(3/12*100%)]" />
        <col span={1} className="w-[calc(3/12*100%)]" />
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
