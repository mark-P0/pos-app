import { LabelsProvider } from "./contexts/LabelsContext.js";
import { ProductsProvider } from "./contexts/ProductsContext.js";
import { ScreenProvider, useScreenContext } from "./contexts/ScreenContext.js";
import { UserProvider } from "./contexts/UserContext.js";
import { FeaturesScreen } from "./views/FeaturesScreen.js";
import { IMScreen } from "./views/IMScreen.js";
import { LoginScreen } from "./views/LoginScreen.js";
import { POSScreen } from "./views/POSScreen.js";

function WrappedApp() {
  const { screen } = useScreenContext();

  /** https://www.youtube.com/post/UgkxDNktFDKfbg0vwLwNkctzsIJnEVu85Im6 */
  switch (screen) {
    case "login": {
      return <LoginScreen />;
    }
    case "feature-select": {
      return <FeaturesScreen />;
    }
    case "pos": {
      return <POSScreen />;
    }
    case "inv-mgmt": {
      return <IMScreen />;
    }
  }
  screen satisfies never; // MUST be unreachable; something's wrong if it isn't (switch case not exhaustive)
}
export function App() {
  return (
    <LabelsProvider>
      <ProductsProvider>
        <UserProvider>
          <ScreenProvider>
            <WrappedApp />
          </ScreenProvider>
        </UserProvider>
      </ProductsProvider>
    </LabelsProvider>
  );
}
