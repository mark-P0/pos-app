import { Modal, ModalProvider } from "@renderer/contexts/ModalContext.js";
import { C } from "@renderer/utils.js";
import { PropsWithChildren } from "react";
import { DarkModeToggle } from "./DarkModeToggle.js";
import { FeaturesButton } from "./FeaturesButton.js";
import { LogoutButton } from "./LogoutButton.js";

function ActualScreen(
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
      <Modal />

      <header className="flex flex-row-reverse px-4 py-3">
        <DarkModeToggle />
        {withLogoutButton && <LogoutButton />}
        {withFeaturesButton && <FeaturesButton />}
      </header>
      {children}
    </main>
  );
}

export function Screen(
  props: PropsWithChildren<{
    withLogoutButton?: boolean;
    withFeaturesButton?: boolean;
  }>,
) {
  return (
    <ModalProvider>
      <ActualScreen {...props} />
    </ModalProvider>
  );
}
