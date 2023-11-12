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

type Labels = Awaited<ReturnType<typeof ipcInvoke<"app:getNameAndVersion">>>;
function useLabels() {
  const [labels, setLabels] = useState<Labels>(["", ""]);
  useEffect(() => {
    (async () => {
      const labels = await ipcInvoke("app:getNameAndVersion");
      setLabels(labels);
    })();
  }, []);

  return labels;
}

type User = string | null;
function useUser() {
  const [user, setUser] = useState<User>(null);
  function changeUser(to: User) {
    setUser(to);
  }

  return { user, changeUser };
}

type AppValues = {
  screen: Screen;
  changeScreen: (to: Screen) => void;
  labels: Labels;
  user: User;
  changeUser: (to: User) => void;
};
const AppContext = createContext<AppValues | null>(null);
export function useAppContext() {
  return useNullableContext({ AppContext });
}
export function AppProvider(props: PropsWithChildren) {
  const { children } = props;
  const { screen, changeScreen } = useScreen();
  const labels = useLabels();
  const { user, changeUser } = useUser();

  /**
   * - Get the type of this, e.g. via hover definitions
   * - Copy type into context type near the top
   */
  const values = { screen, changeScreen, labels, user, changeUser };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
