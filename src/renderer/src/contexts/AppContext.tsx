import { useEffect, useState } from "react";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Labels = Awaited<ReturnType<typeof ipcInvoke<"app:getNameAndVersion">>>;
function useLabels() {
  const [labels, setLabels] = useState<Labels>(["", ""]);
  useEffect(() => {
    (async () => {
      const labels = await ipcInvoke("app:getNameAndVersion");
      setLabels(labels);
    })();
  }, []);

  return { labels };
}

type User = string | null;
function useUser() {
  const [user, setUser] = useState<User>(null);
  function changeUser(to: User) {
    setUser(to);
  }

  return { user, changeUser };
}

export const [useAppContext, AppProvider] = createNewContext(() => ({
  ...useLabels(),
  ...useUser(),
}));
