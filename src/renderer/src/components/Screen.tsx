import { useAppContext } from "@renderer/contexts/AppContext.js";
import { Modal, ModalProvider } from "@renderer/contexts/ModalContext.js";
import { C, classes } from "@renderer/utils.js";
import { ComponentProps, PropsWithChildren } from "react";
import { LuLayoutGrid, LuLogOut } from "react-icons/lu";
import { DarkModeToggle } from "./DarkModeToggle.js";

function LogoutButton() {
  const { changeScreen, changeUser } = useAppContext();

  function logout() {
    changeUser(null);
    changeScreen("login");
  }

  return (
    <button className={classes.button.icon} onClick={logout}>
      <LuLogOut className="w-full h-full scale-[-1]" />
    </button>
  );
}

function FeaturesButton() {
  const { changeScreen } = useAppContext();

  function chooseFeature() {
    changeScreen("feature-select");
  }

  return (
    <button className={classes.button.icon} onClick={chooseFeature}>
      <LuLayoutGrid className="w-full h-full" />
    </button>
  );
}

function WrappedScreen(
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
    ...[classes.bg, classes.text, classes.selection],
    classes.outline,
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
export function Screen(props: ComponentProps<typeof WrappedScreen>) {
  return (
    <ModalProvider>
      <WrappedScreen {...props} />
    </ModalProvider>
  );
}
