import { POSButtons } from "@renderer/components/POSButtons.js";
import { ProductList } from "@renderer/components/ProductList.js";
import { QuantityPrompt } from "@renderer/components/QuantityPrompt.js";
import { ReceiptColumn } from "@renderer/components/ReceiptColumn.js";
import { Screen } from "@renderer/components/Screen.js";
import { CartProvider } from "@renderer/contexts/CartContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import {
  Product,
  useProductsContext,
} from "@renderer/contexts/ProductsContext.js";

function POSProductList() {
  const { products } = useProductsContext();
  const { showOnModal } = useModalContext();

  function showQuantityPrompt(product: Product) {
    showOnModal(<QuantityPrompt product={product} />);
  }

  return <ProductList products={products} onItemClick={showQuantityPrompt} />;
}

export function POSScreen() {
  return (
    <CartProvider>
      <Screen withLogoutButton withFeaturesButton>
        <section className="overflow-hidden h-full grid grid-cols-[2fr_3fr_1fr]">
          <ReceiptColumn />
          <POSProductList />
          <POSButtons />
        </section>
      </Screen>
    </CartProvider>
  );
}
