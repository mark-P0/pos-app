import { C } from "@renderer/utils.js";
import { PropsWithChildren } from "react";
import { DarkModeToggle } from "./DarkModeToggle.js";
import { LogoutButton } from "./LogoutButton.js";

export function Screen(
  props: PropsWithChildren<{
    withLogoutButton?: boolean;
  }>,
) {
  const { children, withLogoutButton } = props;

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
      <header className="absolute right-0 top-0 m-6 flex flex-row-reverse">
        <DarkModeToggle />
        {withLogoutButton && <LogoutButton />}
      </header>

      {children}
    </main>
  );
}
