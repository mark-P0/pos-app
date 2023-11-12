import { PropsWithChildren, createContext, useContext } from "react";

/**
 * - `useValues()` is a custom hook that "provides" the values of the context/provider
 * - All of the context states and stuff (or even other custom hooks!) will be inside `useValues()`
 */
export function createNewContext<T>(useValues: () => T) {
  const NewContext = createContext<T | null>(null);

  function useNewContext(): T {
    const values = useContext(NewContext);
    if (values === null) {
      throw new Error("Context possibly not provided");
    }
    return values;
  }

  function NewContextProvider(props: PropsWithChildren) {
    const { children } = props;
    const values = useValues();

    return <NewContext.Provider value={values}>{children}</NewContext.Provider>;
  }

  return [useNewContext, NewContextProvider] as const;
}
