import { POSButtons } from "@renderer/components/POSButtons.js";
import { ProductList } from "@renderer/components/ProductList.js";
import { ReceiptColumn } from "@renderer/components/ReceiptColumn.js";
import { Screen } from "@renderer/components/Screen.js";
import { CartProvider } from "@renderer/contexts/CartContext.js";

export function POSScreen() {
  return (
    <CartProvider>
      <Screen withLogoutButton withFeaturesButton>
        <section className="overflow-hidden h-full grid grid-cols-[2fr_3fr_1fr]">
          <ReceiptColumn />
          <ProductList />
          <POSButtons />
        </section>
      </Screen>
    </CartProvider>
  );
}
