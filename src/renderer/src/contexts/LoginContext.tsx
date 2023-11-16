import { useState } from "react";
import { createNewContext } from "./utils.js";

export const [useLoginContext, LoginProvider] = createNewContext(() => {
  const [username, setUsername] = useState("");

  return {
    ...{ username, setUsername },
  };
});
