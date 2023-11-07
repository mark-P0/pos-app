import { useAppContext } from "@renderer/contexts/AppContext.js";
import { useMemo } from "react";

function getCurrentDateTime() {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());
}

export function MachineInfo() {
  const { labels } = useAppContext();
  const [appName, appVersion] = labels;

  const datetime = useMemo(getCurrentDateTime, []); // Run only once, on initial render

  return (
    <>
      <p className="normal-case text-center">
        Served by{" "}
        <span className="text-red-500 font-bold">[LOGGED_IN_USER]</span>
      </p>
      <p className="normal-case text-center">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        {datetime} // {appName} v{appVersion}{" "}
      </p>
    </>
  );
}
