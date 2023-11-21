import { Screen } from "@renderer/components/Screen.js";
import { useLabelsContext } from "@renderer/contexts/LabelsContext.js";
import {
  LoginProvider,
  useLoginContext,
} from "@renderer/contexts/LoginContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import { useUserContext } from "@renderer/contexts/UserContext.js";
import { useNewRef } from "@renderer/utils.js";
import {
  C,
  cls$absolute$center,
  cls$button$primary,
  cls$button$secondary,
  cls$card,
} from "@renderer/utils/classes.js";
import { ChangeEvent, FormEvent, useEffect } from "react";

const { ipcInvoke } = window.api;

const Validators: Record<string, () => Promise<boolean>> = {};
async function runValidations() {
  const validations = Object.values(Validators);
  for (const validation of validations) {
    const status = await validation();
    if (!status) return;
  }
}

const cls$input = C(
  "px-2 py-1",
  "border-2 border-cyan-950 dark:border-transparent dark:bg-cyan-950",
  "transition",
);

function UsernameInput() {
  const [inputRef, accessInputRef] = useNewRef<HTMLInputElement>();
  const { username, setUsername } = useLoginContext();
  async function reflectUsername(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    setUsername(input.value);
    input.setCustomValidity("");
  }

  Validators.UsernameInput = async () => {
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

  return (
    <label className="grid grid-cols-[35%_65%] items-center">
      <span className="text-sm tracking-widest">Username</span>
      <input
        ref={inputRef}
        className={cls$input}
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
  const [inputRef, accessInputRef] = useNewRef<HTMLInputElement>();
  const { password, setPassword, username } = useLoginContext();
  function reflectPassword(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    setPassword(input.value);
    input.setCustomValidity("");
  }

  Validators.PasswordInput = async () => {
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

  return (
    <label className="grid grid-cols-[35%_65%] items-center">
      <span className="text-sm tracking-widest">Password</span>
      <input
        ref={inputRef}
        className={cls$input}
        type="password"
        name="password"
        required
        value={password}
        onChange={reflectPassword}
      />
    </label>
  );
}

const cls$login = C("px-4 py-1", cls$button$primary, "transition");
const cls$login$guest = C("px-4 py-1", cls$button$secondary, "transition");
function LoginForm() {
  const { username, setUsername } = useLoginContext();
  const { changeUser } = useUserContext();
  const { changeScreen } = useScreenContext();
  const { labels } = useLabelsContext();
  const [, version] = labels;

  async function tryLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    await runValidations();
    const isFormValid = form.reportValidity();
    if (!isFormValid) return;
    login();
  }
  function login() {
    changeUser(username);
    changeScreen("feature-select");
  }
  useEffect(() => {
    /**
     * - Wrap in an effect so the potential state-setting will happen after render
     * - Setting state during render is "improper"
     */
    if (username === "guest") {
      login();
    }
  });

  return (
    <form className="grid gap-6 select-none" onSubmit={tryLogin}>
      <section className="grid gap-3">
        <UsernameInput />
        <PasswordInput />
      </section>

      <div className="flex justify-between items-end">
        <span className="uppercase text-xs opacity-50 dark:opacity-25">
          Version {version}
        </span>
        <div className="flex gap-2">
          <button
            className={cls$login$guest}
            type="button"
            onClick={() => setUsername("guest")}
          >
            As Guest
          </button>
          <button className={cls$login}>Log In</button>
        </div>
      </div>
    </form>
  );
}

function LoginCard() {
  const cls = C(
    cls$absolute$center,
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
