import { useAppContext } from "@renderer/contexts/AppContext.js";

export function MachineInfo() {
  const { labels } = useAppContext();
  const [appName, appVersion] = labels;

  return (
    <>
      <p className="normal-case">
        Served By:{" "}
        <span className="text-red-500 font-bold">[LOGGED_IN_USER]</span>
      </p>
      <p className="normal-case">
        <span className="text-red-500 font-bold">[DATE]</span>{" "}
        <span className="text-red-500 font-bold">[TIME]</span>
      </p>
      <p className="normal-case">
        {appName} v{appVersion}
      </p>
    </>
  );
}
