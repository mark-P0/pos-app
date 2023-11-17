import { useLabelsContext } from "@renderer/contexts/LabelsContext.js";
import { useUserContext } from "@renderer/contexts/UserContext.js";
import { useMemo } from "react";

function getCurrentDateTime() {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());
}

export function MachineInfo() {
  const { user } = useUserContext();
  const { labels } = useLabelsContext();
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
