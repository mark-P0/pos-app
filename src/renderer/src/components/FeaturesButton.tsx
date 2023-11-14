import { useAppContext } from "@renderer/contexts/AppContext.js";
import { classes } from "@renderer/utils.js";
import { LuLayoutGrid } from "react-icons/lu";

export function FeaturesButton() {
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
