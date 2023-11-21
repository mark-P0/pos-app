import { useEffect, useState } from "react";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Status = Awaited<ReturnType<typeof ipcInvoke<"dark-mode:status">>>;
function useStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    reflectStatus();
  }, []);
  async function reflectStatus() {
    const status = await ipcInvoke("dark-mode:status");
    setStatus(status);
  }

  function toggle() {
    ipcInvoke("dark-mode:cycle");
    reflectStatus();
  }

  return { status, toggle };
}

export const [useDarkModeContext, DarkModeProvider] =
  createNewContext(useStatus);
