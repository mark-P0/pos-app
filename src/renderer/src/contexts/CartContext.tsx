import { useState } from "react";
import { Product } from "./ProductsContext.js";
import { createNewContext } from "./utils.js";

type Cart = Map<Product["sku"], number>;
function useCart() {
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

  return { cart, isCartEmpty, addToCart };
}

export const [useCartContext, CartProvider] = createNewContext(() => ({
  ...useCart(),
}));
