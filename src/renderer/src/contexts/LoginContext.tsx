import { useState } from "react";
import { createNewContext } from "./utils.js";

export const [useLoginContext, LoginProvider] = createNewContext(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return {
    ...{ username, setUsername },
    ...{ password, setPassword },
  };
});
