import { ProductList } from "@renderer/components/ProductList.js";
import { ReceiptColumn } from "@renderer/components/ReceiptColumn.js";
import { Screen } from "@renderer/components/Screen.js";
import { CartProvider } from "@renderer/contexts/CartContext.js";

export function POSScreen() {
  return (
    <CartProvider>
      <Screen withLogoutButton withFeaturesButton>
        <section className="overflow-hidden h-full grid grid-cols-[2fr_3fr_1fr] gap-6">
          <ReceiptColumn />
          <ProductList />
          <div className="bg-yellow-500/25">buttons</div>
        </section>
      </Screen>
    </CartProvider>
  );
}
