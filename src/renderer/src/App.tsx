import { Screen } from "./components/Screen.js";
import { FunctionScreen } from "./views/FunctionScreen.js";
import { IMScreen } from "./views/IMScreen.js";
import { LoginScreen } from "./views/LoginScreen.js";
import { POSScreen } from "./views/POSScreen.js";

export function App() {
  return <IMScreen />;
  return <POSScreen />;
  return <FunctionScreen />;
  return <LoginScreen />;
  return <Screen />;
}
