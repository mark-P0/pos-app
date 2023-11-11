import { PropsWithChildren, createContext, useState } from "react";
import { Product } from "./ProductsContext.js";
import { useNullableContext } from "./utils.js";

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

type CartValues = {
  cart: Cart;
  isCartEmpty: boolean;
  addToCart: (sku: Product["sku"], qty: number) => void;
};
const CartContext = createContext<CartValues | null>(null);
export function useCartContext() {
  return useNullableContext({ CartContext });
}
export function CartProvider(props: PropsWithChildren) {
  const { children } = props;
  const { cart, isCartEmpty, addToCart } = useCart();

  const values = { cart, isCartEmpty, addToCart };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}
