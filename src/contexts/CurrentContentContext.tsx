import { createContext, useMemo, useState } from 'react';

/*
  Array as string literal type
  https://stackoverflow.com/a/54061487
*/
let contentLabels = ['home', 'pos', 'transactions', 'inventory'] as const;
type CurrentContentLiterals = typeof contentLabels[number];

/*
interface ContextObjectType {
  label: CurrentContentLiterals;
  changeContent: (to: CurrentContentLiterals) => void;
}

export default createContext<ContextObjectType>({
  label: 'home',
  changeContent: () => {},
});
*/

/* https://kentcdodds.com/blog/application-state-management-with-react */
type CurrentContentStateType = [
  CurrentContentLiterals,
  React.Dispatch<React.SetStateAction<CurrentContentLiterals>> | (() => void)
];
const CurrentContentContext = createContext<CurrentContentStateType>([
  'home',
  () => {},
]);

const CurrentContentProvider: React.FC = (props) => {
  const [currentContent, setCurrentContent] = useState<CurrentContentLiterals>(
    'home'
  );

  const memoCurrentContent = useMemo<CurrentContentStateType>(
    () => [currentContent, setCurrentContent],
    [currentContent]
  );

  return (
    <CurrentContentContext.Provider value={memoCurrentContent} {...props} />
  );
};

export default CurrentContentContext;
export type { CurrentContentLiterals };
export { CurrentContentProvider };
