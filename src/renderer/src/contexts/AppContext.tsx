import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNullableContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Screen = "login" | "feature-select" | "pos" | "inv-mgmt";
function useScreen() {
  const [screen, setScreen] = useState<Screen>("login");
  function changeScreen(to: Screen) {
    setScreen(to);
  }

  return { screen, changeScreen };
}

type AppValues = {
  screen: Screen;
  changeScreen: (to: Screen) => void;
  labels: readonly [string, string];
  user: string | null;
  changeUser: (to: string | null) => void;
};
const AppContext = createContext<AppValues | null>(null);
export function useAppContext() {
  return useNullableContext({ AppContext });
}
export function AppProvider(props: PropsWithChildren) {
  const { children } = props;
  const { screen, changeScreen } = useScreen();

  type Labels = Awaited<ReturnType<typeof ipcInvoke<"app:getNameAndVersion">>>;
  const [labels, setLabels] = useState<Labels>(["", ""]);
  useEffect(() => {
    (async () => {
      const labels = await ipcInvoke("app:getNameAndVersion");
      setLabels(labels);
    })();
  }, []);

  const [user, setUser] = useState<string | null>(null);
  function changeUser(to: string | null) {
    setUser(to);
  }

  /**
   * - Get the type of this, e.g. via hover definitions
   * - Copy type into context type near the top
   */
  const values = { screen, changeScreen, labels, user, changeUser };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
