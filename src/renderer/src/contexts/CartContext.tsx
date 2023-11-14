import { createNewRef, raise, sleep, sum } from "@renderer/utils.js";
import { random$string } from "@renderer/utils/random.js";
import { toPng } from "html-to-image";
import { useEffect, useState } from "react";
import { Product, useProductsContext } from "./ProductsContext.js";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Cart = Map<Product["sku"], number>;
function useCart() {
  const { productMap } = useProductsContext();
  const [cart, setCart] = useState<Cart>(new Map());

  const isCartEmpty = cart.size === 0;

  function rebuildCart() {
    let entries = [...cart.entries()];

    /* Remove items without quantities */
    entries = entries.filter(([, v]) => v > 0);

    const newCart = new Map(entries);
    setCart(newCart);
  }

  function addToCart(sku: Product["sku"], qty: number) {
    const ct = cart.get(sku) ?? 0;
    cart.set(sku, ct + qty);
    rebuildCart();
  }

  function clearCart() {
    setCart(new Map());
  }

  function* generateCartProductAndQty() {
    for (const [sku, qty] of cart.entries()) {
      const product =
        productMap.get(sku) ?? raise(`Unknown SKU on cart "${sku}"`);
      yield [product, qty] as const;
    }
  }

  function* generatePriceQtyMultiplication() {
    for (const [product, qty] of generateCartProductAndQty()) {
      yield product.price * qty;
    }
  }
  const totalCartPrice = sum(...generatePriceQtyMultiplication());

  return {
    cart,
    isCartEmpty,
    addToCart,
    clearCart,
    generateCartProductAndQty,
    totalCartPrice,
  };
}

function usePayment(cartValues: ReturnType<typeof useCart>) {
  const { totalCartPrice } = cartValues;
  const [payment, setPayment] = useState<number | null>(null);

  function pay(amount: number) {
    if (amount < totalCartPrice) {
      throw new Error(
        `Payment ${amount} less than cart price ${totalCartPrice}`,
      );
    }

    setPayment(amount);
  }

  return { payment, pay };
}

function useTransactionId() {
  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    regenerateTransactionId();
  }, []);

  function regenerateTransactionId() {
    setTransactionId(random$string(16));
  }

  return { transactionId, regenerateTransactionId };
}

function useReceiptRef(
  transactionIdValues: ReturnType<typeof useTransactionId>,
) {
  const [receiptRef, accessReceiptRef] = createNewRef<HTMLElement>();
  const { transactionId } = transactionIdValues;
  const pngFilename = `data/receipts/${transactionId}.png`;
  const pngUrl = `pos-app:///${pngFilename}`;

  async function saveReceiptAsPng() {
    const pngUri = await toPng(accessReceiptRef());
    await ipcInvoke("fs:writePngUriToFile", pngUri, pngFilename);
    await sleep(250); // Extra time for writing(?)
    return pngUrl;
  }

  return { receiptRef, saveReceiptAsPng };
}

export const [useCartContext, CartProvider] = createNewContext(() => {
  const cartValues = useCart();
  const transactionIdValues = useTransactionId();

  return {
    ...cartValues,
    ...usePayment(cartValues),
    ...transactionIdValues,
    ...useReceiptRef(transactionIdValues),
  };
});
