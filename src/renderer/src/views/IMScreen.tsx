import { ProductList } from "@renderer/components/ProductList.js";
import { Screen } from "@renderer/components/Screen.js";

export function IMScreen() {
  return (
    <Screen withLogoutButton withFeaturesButton>
      <section className="overflow-hidden h-full grid grid-cols-[3fr_1fr]">
        <ProductList />
        <div className="bg-yellow-500/50">actions</div>
      </section>
    </Screen>
  );
}
