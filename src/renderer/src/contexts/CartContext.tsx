import { raise, sum } from "@renderer/utils.js";
import { useState } from "react";
import { Product, useProductsContext } from "./ProductsContext.js";
import { createNewContext } from "./utils.js";

type Cart = Map<Product["sku"], number>;
function useCart() {
  const [cart, setCart] = useState<Cart>(new Map());
  const { productMap } = useProductsContext();

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

  const [payment, setPayment] = useState<number | null>(null);
  function pay(amount: number) {
    if (amount < totalCartPrice) {
      throw new Error(
        `Payment ${amount} less than cart price ${totalCartPrice}`,
      );
    }

    setPayment(amount);
  }

  return {
    cart,
    isCartEmpty,
    addToCart,
    clearCart,
    generateCartProductAndQty,
    totalCartPrice,
    ...{ payment, pay },
  };
}

export const [useCartContext, CartProvider] = createNewContext(() => ({
  ...useCart(),
}));
