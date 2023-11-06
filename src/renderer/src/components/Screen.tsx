import { C } from "@renderer/utils.js";
import { PropsWithChildren } from "react";
import { DarkModeToggle } from "./DarkModeToggle.js";
import { FeaturesButton } from "./FeaturesButton.js";
import { LogoutButton } from "./LogoutButton.js";

export function Screen(
  props: PropsWithChildren<{
    withLogoutButton?: boolean;
    withFeaturesButton?: boolean;
  }>,
) {
  const {
    children,
    withLogoutButton = false,
    withFeaturesButton = false,
  } = props;

  const cls = C(
    "overflow-hidden relative",
    "h-screen flex flex-col",
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
      <header className="flex flex-row-reverse p-6">
        <DarkModeToggle />
        {withLogoutButton && <LogoutButton />}
        {withFeaturesButton && <FeaturesButton />}
      </header>

      {children}
    </main>
  );
}
