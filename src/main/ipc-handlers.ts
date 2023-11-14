import { IpcMainInvokeEvent, app, ipcMain, nativeTheme } from "electron";
import { writeFile } from "fs/promises";
import { assessUserCredentials, getAllProducts } from "../../data/db.js";
import { getActualFilePath } from "../../data/utils.js";

const ChannelHandlers = {
  "db:getAllProducts": async () => {
    const products = await getAllProducts();
    return products;
  },
  /** https://www.electronjs.org/docs/latest/tutorial/dark-mode#example */
  "dark-mode:toggle": () => {
    const isDarkMode = nativeTheme.shouldUseDarkColors;
    if (isDarkMode) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
  },
  "db:assessUserCredentials": async (
    _: IpcMainInvokeEvent,
    user: Parameters<typeof assessUserCredentials>[0],
  ) => {
    return await assessUserCredentials(user);
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
