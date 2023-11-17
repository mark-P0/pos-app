import { useState } from "react";
import { createNewContext } from "./utils.js";

type User = string | null;
function useUser() {
  const [user, setUser] = useState<User>(null);
  function changeUser(to: User) {
    setUser(to);
  }

  return { user, changeUser };
}

export const [useUserContext, UserProvider] = createNewContext(useUser);
