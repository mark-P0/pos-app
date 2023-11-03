import { PropsWithChildren, createContext } from "react";
import { useNullableContext } from "./utils.js";

type AppValues = Record<string, never>; // Nothing yet
const AppContext = createContext<AppValues | null>(null);

export function useAppContext() {
  return useNullableContext({ AppContext });
}

export function AppProvider(props: PropsWithChildren) {
  const { children } = props;

  /**
   * - Get the type of this, e.g. via hover definitions
   * - Copy type into context type above
   */
  const values = {};
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
