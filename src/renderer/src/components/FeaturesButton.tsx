import { useAppContext } from "@renderer/contexts/AppContext.js";
import { C, classes } from "@renderer/utils.js";
import { LuLayoutGrid } from "react-icons/lu";

export function FeaturesButton() {
  const { changeScreen } = useAppContext();

  function chooseFeature() {
    changeScreen("feature-select");
  }

  const cls = C(
    "overflow-hidden w-12 aspect-square rounded-full p-3",
    classes.interactiveHoverBg,
    "active:scale-90",
    "transition",
  );
  return (
    <button className={cls} onClick={chooseFeature}>
      <LuLayoutGrid className="w-full h-full" />
    </button>
  );
}
