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
