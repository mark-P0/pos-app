import { Context, PropsWithChildren, createContext, useContext } from "react";

/**
 * Wrapper for context pattern where the default value is `null`
 *
 * https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context#without-default-context-value
 *
 * Used like `useNullableContext({ YourContext })` to automatically get a `'YourContext'` name
 */
export function useNullableContext<T>(
  namedContext: Record<string, Context<T | null>>,
): T {
  const entries = Object.entries(namedContext);
  if (entries.length > 1) {
    throw new Error("Possible improper use of custom context hook");
  }
  const [name, context] = entries[0];
  const values = useContext(context);
  if (values === null) {
    throw new Error(`${name} not provided`);
  }
  return values;
}

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
