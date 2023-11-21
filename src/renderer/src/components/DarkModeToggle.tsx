import { useDarkModeContext } from "@renderer/contexts/DarkModeContext.js";
import { C, cls$button$icon } from "@renderer/utils/classes.js";
import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";

export function DarkModeToggle() {
  const { status, toggle } = useDarkModeContext();

  const cls = (() => {
    const button = C("relative", cls$button$icon);
    const icon = C(
      "absolute top-0 left-0 p-3",
      "h-full w-full",
      "opacity-0",
      "transition",
    );
    const dark = C(icon, "text-cyan-400", status === "dark" && "opacity-100");
    const light = C(
      icon,
      "text-amber-400",
      status === "light" && "opacity-100",
    );
    const system = C(
      icon,
      "text-green-400", // In "between" light and dark colors
      status === "system" && "opacity-100",
    );

    return { button, icon: { dark, light, system } };
  })();
  return (
    <button className={cls.button} onClick={toggle}>
      <LuMoon className={cls.icon.dark} />
      <LuSun className={cls.icon.light} />
      <LuSunMoon className={cls.icon.system} />
    </button>
  );
}
