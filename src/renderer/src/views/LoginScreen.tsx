import { Screen } from "@renderer/components/Screen.js";
import { useAppContext } from "@renderer/contexts/AppContext.js";
import { C } from "@renderer/utils.js";
import { FormEvent } from "react";

function LoginForm() {
  const { changeScreen } = useAppContext();

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /* Authenticate user */

    changeScreen("feature-select");
  }

  const cls = C(
    "w-96 grid gap-12 p-12 pb-6",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-white/10 rounded-xl",
    "transition",
  );
  const inputCls = C(
    "px-2 py-1",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-cyan-950",
    "transition",
  );
  const buttonCls = C(
    "px-4 py-1",
    "transition bg-rose-700 hover:bg-rose-600 active:scale-95 text-white",
  );
  return (
    <section className={cls}>
      <header className="grid place-content-center">
        <code className="text-3xl font-bold tracking-widest">pos-app</code>
      </header>

      <form className="grid gap-6 select-none" onSubmit={login}>
        <section className="grid gap-3">
          <label className="grid grid-cols-[35%_65%] items-center">
            <span className="text-sm tracking-widest">Username</span>
            <input className={inputCls} type="text" name="username" />
          </label>
          <label className="grid grid-cols-[35%_65%] items-center">
            <span className="text-sm tracking-widest">Password</span>
            <input className={inputCls} type="password" name="password" />
          </label>
        </section>

        <div className="flex justify-between items-end">
          <span className="uppercase text-xs opacity-50 dark:opacity-25">
            Version 0.0.0
          </span>
          <button className={buttonCls}>Log In</button>
        </div>
      </form>
    </section>
  );
}

export function LoginScreen() {
  return (
    <Screen>
      <LoginForm />
    </Screen>
  );
}
