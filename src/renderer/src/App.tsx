import { LabelsProvider } from "./contexts/LabelsContext.js";
import { ProductFormBasisProvider } from "./contexts/ProductFormBasisContext.js";
import { ProductsProvider } from "./contexts/ProductsContext.js";
import { ScreenProvider, useScreenContext } from "./contexts/ScreenContext.js";
import { UserProvider } from "./contexts/UserContext.js";
import { FeaturesScreen } from "./views/FeaturesScreen.js";
import { IMScreen } from "./views/IMScreen.js";
import { LoginScreen } from "./views/LoginScreen.js";
import { POSScreen } from "./views/POSScreen.js";
import { ProductFormScreen } from "./views/ProductFormScreen.js";

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
    case "product-form": {
      return <ProductFormScreen />;
    }
  }
  screen satisfies never; // MUST be unreachable; something's wrong if it isn't (switch case not exhaustive)
}
export function App() {
  /* Order providers from least changing to most changing */
  return (
    <LabelsProvider>
      <ProductsProvider>
        {/* ↑ Touches file system | ↓ App only */}
        <UserProvider>
          <ProductFormBasisProvider>
            <ScreenProvider>
              <WrappedApp />
            </ScreenProvider>
          </ProductFormBasisProvider>
        </UserProvider>
      </ProductsProvider>
    </LabelsProvider>
  );
}
