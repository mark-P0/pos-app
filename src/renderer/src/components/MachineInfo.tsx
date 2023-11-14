import { useAppContext } from "@renderer/contexts/AppContext.js";
import { useMemo } from "react";

function getCurrentDateTime() {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());
}

export function MachineInfo() {
  const { labels, user } = useAppContext();
  const [appName, appVersion] = labels;

  const datetime = useMemo(getCurrentDateTime, []); // Run only once, on initial render

  return (
    <>
      <p className="normal-case text-center">Served by `{user}`</p>
      <p className="normal-case text-center">{datetime}</p>
      <p className="normal-case text-center">
        {appName} v{appVersion}{" "}
      </p>
    </>
  );
}
