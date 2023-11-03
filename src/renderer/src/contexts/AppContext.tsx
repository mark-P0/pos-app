import { PropsWithChildren, createContext, useState } from "react";
import { useNullableContext } from "./utils.js";

type Screen = "login" | "feature-select" | "pos" | "inv-mgmt";

type AppValues = {
  screen: Screen;
  changeScreen: (to: Screen) => void;
};
const AppContext = createContext<AppValues | null>(null);

export function useAppContext() {
  return useNullableContext({ AppContext });
}

export function AppProvider(props: PropsWithChildren) {
  const { children } = props;

  const [screen, setScreen] = useState<Screen>("login");
  function changeScreen(to: Screen) {
    setScreen(to);
  }

  /**
   * - Get the type of this, e.g. via hover definitions
   * - Copy type into context type near the top
   */
  const values = { screen, changeScreen };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
