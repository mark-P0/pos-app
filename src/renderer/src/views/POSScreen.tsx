import { Screen } from "@renderer/components/Screen.js";

export function POSScreen() {
  return (
    <Screen withLogoutButton withFeaturesButton>
      <section className="h-full grid grid-cols-5">
        <div className="col-span-2 bg-red-500/25">receipt</div>
        <div className="col-span-2 bg-green-500/25">product-list</div>
        <div className="bg-yellow-500/25">buttons</div>
      </section>
    </Screen>
  );
}
