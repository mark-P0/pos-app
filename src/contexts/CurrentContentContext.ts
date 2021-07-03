import { createContext } from 'react';
import { NavbarButtonIconMap } from '../components/Navbar';

/*
  Array as string literal type
  https://stackoverflow.com/a/54061487
*/
let contentLabels = ['home', 'pos', 'transactions', 'inventory'] as const;
type CurrentContentLiterals = typeof contentLabels[number];

interface ContextObjectType {
  label: CurrentContentLiterals;
  changeContent: (to: CurrentContentLiterals) => void;
}

export default createContext<ContextObjectType>({
  label: 'home',
  changeContent: () => {},
});
export type { CurrentContentLiterals };
