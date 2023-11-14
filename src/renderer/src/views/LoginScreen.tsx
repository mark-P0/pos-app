import { Screen } from "@renderer/components/Screen.js";
import { useAppContext } from "@renderer/contexts/AppContext.js";
import { C, classes, createNewRef } from "@renderer/utils.js";
import { ChangeEvent, FormEvent, RefObject, useEffect, useState } from "react";

const { ipcInvoke } = window.api;

function accessNullableRef<T>(namedRef: Record<string, RefObject<T>>): T {
  const entries = Object.entries(namedRef);
  if (entries.length > 1) {
    throw new Error("Possible improper use of ref wrapper");
  }
  const [name, ref] = entries[0];

  const current = ref.current;
  if (current === null) {
    throw new Error(`${name} ref does not exist`);
  }
  return current;
}

function LoginForm() {
  const { changeScreen, changeUser } = useAppContext();

  const [usernameRef] = createNewRef<HTMLInputElement>();
  const [passwordRef] = createNewRef<HTMLInputElement>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  function updateUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
    const input = accessNullableRef({ usernameRef });
    input.setCustomValidity("");
  }
  function updatePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
    const input = accessNullableRef({ passwordRef });
    input.setCustomValidity("");
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = { username, password };
    const assessment = await ipcInvoke("db:assessUserCredentials", user);

    if (assessment === "invalid:username") {
      const input = accessNullableRef({ usernameRef });
      input.setCustomValidity("Username does not exist");
      input.reportValidity();
      return;
    }
    if (assessment === "invalid:password") {
      const input = accessNullableRef({ passwordRef });
      input.setCustomValidity("Password is incorrect");
      input.reportValidity();
      return;
    }

    finalizeLogin();
  }
  function finalizeLogin() {
    changeUser(username);
    changeScreen("feature-select");
  }
  useEffect(() => {
    /**
     * - Wrap in an effect so the potential state-setting will happen after render
     * - Setting state during render is "improper"
     */
    if (username === "guest") {
      finalizeLogin();
    }
  });

  const inputCls = C(
    "px-2 py-1",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-cyan-950",
    "transition",
  );
  const buttonCls = C("px-4 py-1", classes.button.primary, "transition");
  const buttonGuestCls = C("px-4 py-1", classes.button.secondary, "transition");
  return (
    <form className="grid gap-6 select-none" onSubmit={login}>
      <section className="grid gap-3">
        <label className="grid grid-cols-[35%_65%] items-center">
          <span className="text-sm tracking-widest">Username</span>
          <input
            ref={usernameRef}
            className={inputCls}
            type="text"
            name="username"
            required
            value={username}
            onChange={updateUsername}
          />
        </label>
        <label className="grid grid-cols-[35%_65%] items-center">
          <span className="text-sm tracking-widest">Password</span>
          <input
            ref={passwordRef}
            className={inputCls}
            type="password"
            name="password"
            required
            value={password}
            onChange={updatePassword}
          />
        </label>
      </section>

      <div className="flex justify-between items-end">
        <span className="uppercase text-xs opacity-50 dark:opacity-25">
          Version 0.0.0
        </span>
        <div className="flex gap-2">
          <button
            className={buttonGuestCls}
            type="button"
            onClick={() => setUsername("guest")}
          >
            As Guest
          </button>
          <button className={buttonCls}>Log In</button>
        </div>
      </div>
    </form>
  );
}

function LoginCard() {
  const cls = C(
    classes.absoluteCenter,
    "w-[28rem] grid gap-12 p-12 pb-6",
    classes.card,
    "transition",
  );
  return (
    <section className={cls}>
      <header className="grid place-content-center">
        <h1 className="text-5xl font-head uppercase tracking-widest">
          <span className="font-bold">pos</span> app
        </h1>
      </header>

      <LoginForm />
    </section>
  );
}

export function LoginScreen() {
  return (
    <Screen>
      <LoginCard />
    </Screen>
  );
}
