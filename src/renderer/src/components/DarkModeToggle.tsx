import { useDarkModeContext } from "@renderer/contexts/DarkModeContext.js";
import { C, cls$button$icon } from "@renderer/utils/classes.js";
import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";

const cls$button = C("relative", cls$button$icon);
const cls$icon = C("absolute top-0 left-0 p-3", "h-full w-full", "transition");
const cls$icon$dark = C(
  cls$icon,
  "text-cyan-400",
  "opacity-0 dark:opacity-100",
);
const cls$icon$light = C(
  cls$icon,
  "text-amber-400",
  "opacity-100 dark:opacity-0",
);
export function DarkModeToggle() {
  const { status, toggle } = useDarkModeContext();

  const cls$icon$system = C(
    cls$icon,
    "text-green-400", // In "between" light and dark colors
    status === "system" ? "opacity-100" : "opacity-0",
  );
  return (
    <button className={cls$button} onClick={toggle}>
      <LuMoon className={cls$icon$dark} />
      <LuSun className={cls$icon$light} />
      <LuSunMoon className={cls$icon$system} />
    </button>
  );
}
