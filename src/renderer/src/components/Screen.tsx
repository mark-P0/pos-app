import { C } from "@renderer/utils.js";
import { PropsWithChildren } from "react";
import { DarkModeToggle } from "./DarkModeToggle.js";

export function Screen(props: PropsWithChildren) {
  const { children } = props;

  const cls = C(
    "relative",
    "h-screen grid place-content-center",
    "font-body",
    ...[
      ...[
        "bg-white text-cyan-950",
        "selection:bg-cyan-950 selection:text-white",
      ],
      ...[
        "dark:bg-cyan-950 dark:text-white",
        "dark:selection:bg-white dark:selection:text-cyan-950",
      ],
    ],
    "transition",
  );
  return (
    <main className={cls}>
      <DarkModeToggle className="absolute right-0 top-0 -translate-x-6 translate-y-6" />
      {children}
    </main>
  );
}
