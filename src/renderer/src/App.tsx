import { Screen } from "./components/Screen.js";
import { AppProvider, useAppContext } from "./contexts/AppContext.js";
import { FunctionScreen } from "./views/FunctionScreen.js";
import { IMScreen } from "./views/IMScreen.js";
import { LoginScreen } from "./views/LoginScreen.js";
import { POSScreen } from "./views/POSScreen.js";

function AppContents() {
  const values = useAppContext();
  console.log({ values });

  return <IMScreen />;
  return <POSScreen />;
  return <FunctionScreen />;
  return <LoginScreen />;
  return <Screen />;
}

export function App() {
  return (
    <AppProvider>
      <AppContents />
    </AppProvider>
  );
}
