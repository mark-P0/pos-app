import { Screen } from "@renderer/components/Screen.js";
import { useAppContext } from "@renderer/contexts/AppContext.js";
import { C } from "@renderer/utils.js";
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

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

  const inputUsernameRef = useRef<HTMLInputElement | null>(null);
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  function updateUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
    const input = accessNullableRef({ inputUsernameRef });
    input.setCustomValidity("");
  }
  function updatePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
    const input = accessNullableRef({ inputPasswordRef });
    input.setCustomValidity("");
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = { username, password };
    const assessment = await ipcInvoke("db:assessUserCredentials", user);

    if (assessment === "invalid:username") {
      const input = accessNullableRef({ inputUsernameRef });
      input.setCustomValidity("Username does not exist");
      input.reportValidity();
      return;
    }
    if (assessment === "invalid:password") {
      const input = accessNullableRef({ inputPasswordRef });
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
  const buttonCls = C(
    "px-4 py-1",
    "transition bg-rose-700 hover:bg-rose-600 active:scale-95 text-white",
  );
  const buttonGuestCls = C(
    "px-4 py-1",
    "transition bg-cyan-800 hover:bg-cyan-700 active:scale-95 text-white",
  );
  return (
    <form className="grid gap-6 select-none" onSubmit={login}>
      <section className="grid gap-3">
        <label className="grid grid-cols-[35%_65%] items-center">
          <span className="text-sm tracking-widest">Username</span>
          <input
            ref={inputUsernameRef}
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
            ref={inputPasswordRef}
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
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "w-[28rem] grid gap-12 p-12 pb-6",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-white/10 rounded-xl",
    "transition",
  );
  return (
    <section className={cls}>
      <header className="grid place-content-center">
        <code className="text-3xl font-bold tracking-widest">pos-app</code>
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
