import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNullableContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Screen = "login" | "feature-select" | "pos" | "inv-mgmt";

type AppValues = {
  screen: Screen;
  changeScreen: (to: Screen) => void;
  labels: readonly [string, string];
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

  type Labels = Awaited<ReturnType<typeof ipcInvoke<"app:getNameAndVersion">>>;
  const [labels, setLabels] = useState<Labels>(["", ""]);
  useEffect(() => {
    (async () => {
      const labels = await ipcInvoke("app:getNameAndVersion");
      setLabels(labels);
    })();
  }, []);

  /**
   * - Get the type of this, e.g. via hover definitions
   * - Copy type into context type near the top
   */
  const values = { screen, changeScreen, labels };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
