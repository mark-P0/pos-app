import { useAppContext } from "@renderer/contexts/AppContext.js";
import { classes } from "@renderer/utils.js";
import { LuLogOut } from "react-icons/lu";

export function LogoutButton() {
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
