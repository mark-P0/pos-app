import { IpcMainInvokeEvent, app, ipcMain, nativeTheme } from "electron";
import { writeFile } from "fs/promises";
import {
  assessUserCredentials,
  getAllProducts,
  isUsernameExisting,
} from "../../data/db.js";
import { getActualFilePath } from "../../data/utils.js";

/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description */
function modulo(n: number, d: number) {
  return ((n % d) + d) % d;
}
function wrappedAccess<T>(seq: ArrayLike<T>, idx: number): T {
  const effectiveIdx = modulo(idx, seq.length);
  return seq[effectiveIdx];
}

const ChannelHandlers = {
  "db:getAllProducts": async () => {
    const products = await getAllProducts();
    return products;
  },
  /** https://www.electronjs.org/docs/latest/tutorial/dark-mode#example */
  "dark-mode:cycle": () => {
    type Theme = typeof nativeTheme.themeSource;
    const themes: Theme[] = ["system", "light", "dark"];
    const idx = themes.indexOf(nativeTheme.themeSource);
    nativeTheme.themeSource = wrappedAccess(themes, idx + 1); // Move theme forward
    return nativeTheme.themeSource;
  },
  "dark-mode:status": () => {
    return nativeTheme.themeSource;
  },
  "db:assessUserCredentials": async (
    _: IpcMainInvokeEvent,
    user: Parameters<typeof assessUserCredentials>[0],
  ) => {
    return await assessUserCredentials(user);
  },
  "db:isUsernameExisting": async (
    _: IpcMainInvokeEvent,
    username: Parameters<typeof isUsernameExisting>[0],
  ) => {
    return await isUsernameExisting(username);
  },
  "fs:writeTextFile": async (
    _: IpcMainInvokeEvent,
    filename: string,
    content: string,
  ) => {
    await writeFile(getActualFilePath(filename), content);
  },
  /** https://stackoverflow.com/a/77266873 */
  "fs:writePngUriToFile": async (
    _: IpcMainInvokeEvent,
    uri: string,
    filename: string,
  ) => {
    const [, base64Data] = uri.split(",");
    await writeFile(getActualFilePath(filename), base64Data, "base64");
  },
  "app:getNameAndVersion": () => {
    return [app.getName(), app.getVersion()] as const;
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
