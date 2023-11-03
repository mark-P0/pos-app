import { AppProvider, useAppContext } from "./contexts/AppContext.js";
import { FeaturesScreen } from "./views/FeaturesScreen.js";
import { IMScreen } from "./views/IMScreen.js";
import { LoginScreen } from "./views/LoginScreen.js";
import { POSScreen } from "./views/POSScreen.js";

function AppContents() {
  const { screen } = useAppContext();

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
    <AppProvider>
      <AppContents />
    </AppProvider>
  );
}
