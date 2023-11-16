import { Screen } from "@renderer/components/Screen.js";
import {
  LoginProvider,
  useLoginContext,
} from "@renderer/contexts/LoginContext.js";
// import { useAppContext } from "@renderer/contexts/AppContext.js";
import { createNewRef } from "@renderer/utils.js";
import {
  C,
  cls$absoluteCenter,
  cls$button$primary,
  // cls$button$secondary,
  cls$card,
} from "@renderer/utils/classes.js";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const { ipcInvoke } = window.api;

function useVersion() {
  const [version, setVersion] = useState("");
  useEffect(() => {
    async function initialize() {
      const [, version] = await ipcInvoke("app:getNameAndVersion");
      setVersion(version);
    }
    initialize();
  }, []);

  return version;
}

const CheckerRecord: Record<string, () => Promise<boolean>> = {};
async function runCheckers() {
  const checkers = Object.values(CheckerRecord);
  for (const checker of checkers) {
    const status = await checker();
    if (!status) return;
  }
}

function UsernameInput() {
  const [inputRef, accessInputRef] = createNewRef<HTMLInputElement>();
  const { username, setUsername } = useLoginContext();
  async function reflectUsername(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    setUsername(input.value);
    input.setCustomValidity("");
  }

  CheckerRecord.UsernameInput = async () => {
    const input = accessInputRef();

    const isUsernameExisting = await ipcInvoke(
      "db:isUsernameExisting",
      username,
    );
    if (!isUsernameExisting) {
      input.setCustomValidity("Username does not exist");
      input.reportValidity();
      return false;
    }
    return true;
  };

  const cls = C(
    "px-2 py-1",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-cyan-950",
    "transition",
  );
  return (
    <label className="grid grid-cols-[35%_65%] items-center">
      <span className="text-sm tracking-widest">Username</span>
      <input
        ref={inputRef}
        className={cls}
        type="text"
        name="username"
        required
        value={username}
        onChange={reflectUsername}
      />
    </label>
  );
}

function PasswordInput() {
  const [inputRef, accessInputRef] = createNewRef<HTMLInputElement>();
  const { password, setPassword, username } = useLoginContext();
  function reflectPassword(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    setPassword(input.value);
    input.setCustomValidity("");
  }

  CheckerRecord.PasswordInput = async () => {
    const input = accessInputRef();

    const user = { username, password };
    const isPasswordCorrect = await ipcInvoke("db:isPasswordCorrect", user);
    if (!isPasswordCorrect) {
      input.setCustomValidity("Password is incorrect");
      input.reportValidity();
      return false;
    }
    return true;
  };

  const cls = C(
    "px-2 py-1",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-cyan-950",
    "transition",
  );
  return (
    <label className="grid grid-cols-[35%_65%] items-center">
      <span className="text-sm tracking-widest">Password</span>
      <input
        ref={inputRef}
        className={cls}
        type="password"
        name="password"
        required
        value={password}
        onChange={reflectPassword}
      />
    </label>
  );
}

function LoginForm() {
  // const { changeScreen, changeUser } = useAppContext();
  const version = useVersion();

  async function assessUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    await runCheckers();
    const isFormValid = form.reportValidity();
    if (!isFormValid) return;
    // login();
  }
  // function login() {
  //   changeUser(username);
  //   changeScreen("feature-select");
  // }
  // useEffect(() => {
  //   /**
  //    * - Wrap in an effect so the potential state-setting will happen after render
  //    * - Setting state during render is "improper"
  //    */
  //   if (username === "guest") {
  //     login();
  //   }
  // });

  const buttonCls = C("px-4 py-1", cls$button$primary, "transition");
  // const buttonGuestCls = C("px-4 py-1", cls$button$secondary, "transition");
  return (
    <form className="grid gap-6 select-none" onSubmit={assessUser}>
      <section className="grid gap-3">
        <UsernameInput />
        <PasswordInput />
      </section>

      <div className="flex justify-between items-end">
        <span className="uppercase text-xs opacity-50 dark:opacity-25">
          Version {version}
        </span>
        <div className="flex gap-2">
          {/* <button
            className={buttonGuestCls}
            type="button"
            onClick={() => setUsername("guest")}
          >
            As Guest
          </button> */}
          <button className={buttonCls}>Log In</button>
        </div>
      </div>
    </form>
  );
}

function LoginCard() {
  const cls = C(
    cls$absoluteCenter,
    "w-[28rem] grid gap-12 p-12 pb-6",
    cls$card,
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
    <LoginProvider>
      <Screen>
        <LoginCard />
      </Screen>
    </LoginProvider>
  );
}
