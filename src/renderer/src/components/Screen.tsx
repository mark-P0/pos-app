import { Modal, ModalProvider } from "@renderer/contexts/ModalContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import { useUserContext } from "@renderer/contexts/UserContext.js";
import {
  C,
  cls$bg,
  cls$button$icon,
  cls$outline,
  cls$selection,
  cls$text,
} from "@renderer/utils/classes.js";
import { ComponentProps, PropsWithChildren } from "react";
import { LuClipboardList, LuLayoutGrid, LuLogOut } from "react-icons/lu";
import { DarkModeToggle } from "./DarkModeToggle.js";

function LogoutButton() {
  const { changeUser } = useUserContext();
  const { changeScreen } = useScreenContext();

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
  const { changeScreen } = useScreenContext();

  function chooseFeature() {
    changeScreen("feature-select");
  }

  return (
    <button className={cls$button$icon} onClick={chooseFeature}>
      <LuLayoutGrid className="w-full h-full" />
    </button>
  );
}

function InventoryManagementButton() {
  const { changeScreen } = useScreenContext();

  function manageInventory() {
    changeScreen("inv-mgmt");
  }

  return (
    <button className={cls$button$icon} onClick={manageInventory}>
      <LuClipboardList className="w-full h-full" />
    </button>
  );
}

const cls$main = C(
  "overflow-hidden relative",
  "h-screen flex flex-col",
  "font-body",
  ...[cls$bg, cls$text, cls$selection],
  cls$outline,
  "transition",
);
function WrappedScreen(
  props: PropsWithChildren<{
    withLogoutButton?: boolean;
    withFeaturesButton?: boolean;
    withInventoryManagementButton?: boolean;
  }>,
) {
  const {
    children,
    withLogoutButton = false,
    withFeaturesButton = false,
    withInventoryManagementButton = false,
  } = props;

  return (
    <main className={cls$main}>
      <Modal />

      <header className="flex flex-row-reverse px-4 py-3">
        <DarkModeToggle />
        {withLogoutButton && <LogoutButton />}
        {withFeaturesButton && <FeaturesButton />}
        {withInventoryManagementButton && <InventoryManagementButton />}
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
