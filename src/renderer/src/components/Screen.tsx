import { useAppContext } from "@renderer/contexts/AppContext.js";
import { Modal, ModalProvider } from "@renderer/contexts/ModalContext.js";
import {
  C,
  cls$bg,
  cls$button$icon,
  cls$outline,
  cls$selection,
  cls$text,
} from "@renderer/utils/classes.js";
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
    <button className={cls$button$icon} onClick={logout}>
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
    <button className={cls$button$icon} onClick={chooseFeature}>
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
    ...[cls$bg, cls$text, cls$selection],
    cls$outline,
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
