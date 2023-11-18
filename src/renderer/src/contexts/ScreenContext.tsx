import { useState } from "react";
import { createNewContext } from "./utils.js";

type Screen = "login" | "feature-select" | "pos" | "inv-mgmt" | "product-form";
function useScreen() {
  const [screen, setScreen] = useState<Screen>("product-form");
  function changeScreen(to: Screen) {
    setScreen(to);
  }

  return { screen, changeScreen };
}

export const [useScreenContext, ScreenProvider] = createNewContext(useScreen);
