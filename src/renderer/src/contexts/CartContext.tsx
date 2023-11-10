import { PropsWithChildren, createContext } from "react";
import { Product } from "./ProductsContext.js";
import { useNullableContext } from "./utils.js";

type Cart = Map<Product["sku"], number>;
function useCart() {
  const cart: Cart = new Map();
  const isCartEmpty = cart.size === 0;

  return { cart, isCartEmpty };
}

type CartValues = {
  cart: Cart;
  isCartEmpty: boolean;
};
const CartContext = createContext<CartValues | null>(null);
export function useCartContext() {
  return useNullableContext({ CartContext });
}
export function CartProvider(props: PropsWithChildren) {
  const { children } = props;
  const { cart, isCartEmpty } = useCart();

  const values = { cart, isCartEmpty };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}
