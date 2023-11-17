import { useEffect, useState } from "react";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Labels = Awaited<ReturnType<typeof ipcInvoke<"app:getNameAndVersion">>>;
function useLabels() {
  const [labels, setLabels] = useState<Labels>(["", ""]);
  useEffect(() => {
    async function initialize() {
      const labels = await ipcInvoke("app:getNameAndVersion");
      setLabels(labels);
    }
    initialize();
  }, []);

  return { labels };
}

export const [useLabelsContext, LabelsProvider] = createNewContext(useLabels);
