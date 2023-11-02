import { app, ipcMain, nativeTheme } from "electron";
import { getAllProducts } from "../../data/db.js";

const ChannelHandlers = {
  "db:getAllProducts": async () => {
    const products = await getAllProducts();
    return products;
  },
  /** https://www.electronjs.org/docs/latest/tutorial/dark-mode#example */
  ...{
    "dark-mode:getSetting": () => {
      return nativeTheme.shouldUseDarkColors;
    },
    "dark-mode:toggle": () => {
      const isDarkMode = nativeTheme.shouldUseDarkColors;
      if (isDarkMode) {
        nativeTheme.themeSource = "light";
      } else {
        nativeTheme.themeSource = "dark";
      }
    },
  },
} as const;

/** https://stackoverflow.com/a/67605309 */
type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any // eslint-disable-line @typescript-eslint/no-explicit-any
  ? R
  : never;

export type Channel = keyof typeof ChannelHandlers;
type Handler<T extends Channel> = (typeof ChannelHandlers)[T];
export type HandlerArgs<T extends Channel> = ParametersExceptFirst<Handler<T>>; // Exclude first parameter which is the IPC event
export type HandlerValue<T extends Channel> = Awaited<ReturnType<Handler<T>>>;

app.whenReady().then(() => {
  /**
   * Object keys union not automatically inferred by design of TS
   * - https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
   * - https://github.com/Microsoft/TypeScript/issues/12870
   * - https://github.com/microsoft/TypeScript/issues/35101
   *
   * Keys union not really needed for the following, so just letting it be...
   */
  for (const [channel, handler] of Object.entries(ChannelHandlers)) {
    ipcMain.handle(channel, handler);
  }
});
