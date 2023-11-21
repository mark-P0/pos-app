import { IpcMainInvokeEvent, app, ipcMain, nativeTheme } from "electron";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  isSKUExisting,
} from "./db/products.js";
import { isPasswordCorrect, isUsernameExisting } from "./db/users.js";
import {
  copyFileToTemp,
  copyImageFileToTemp,
  moveTempFileToImages,
  writePngUriToFile,
} from "./fs.js";

/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description */
function modulo(n: number, d: number) {
  return ((n % d) + d) % d;
}
function wrappedAccess<T>(seq: ArrayLike<T>, idx: number): T {
  const effectiveIdx = modulo(idx, seq.length);
  return seq[effectiveIdx];
}

const ChannelHandlers = {
  "app:getNameAndVersion": () => {
    return [app.getName(), app.getVersion()] as const;
  },
  ...{
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
  },
  ...{
    ...{
      "db:isUsernameExisting": async (
        _: IpcMainInvokeEvent,
        ...args: Parameters<typeof isUsernameExisting>
      ) => {
        return await isUsernameExisting(...args);
      },
      "db:isPasswordCorrect": async (
        _: IpcMainInvokeEvent,
        ...args: Parameters<typeof isPasswordCorrect>
      ) => {
        return await isPasswordCorrect(...args);
      },
    },
    ...{
      "db:getAllProducts": async () => {
        return await getAllProducts();
      },
      "db:addProduct": async (
        _: IpcMainInvokeEvent,
        ...args: Parameters<typeof addProduct>
      ) => {
        return await addProduct(...args);
      },
      "db:deleteProduct": async (
        _: IpcMainInvokeEvent,
        ...args: Parameters<typeof deleteProduct>
      ) => {
        await deleteProduct(...args);
      },
      "db:editProduct": async (
        _: IpcMainInvokeEvent,
        ...args: Parameters<typeof editProduct>
      ) => {
        await editProduct(...args);
      },
      "db:isSKUExisting": async (
        _: IpcMainInvokeEvent,
        ...args: Parameters<typeof isSKUExisting>
      ) => {
        return await isSKUExisting(...args);
      },
    },
  },
  ...{
    "fs:writePngUriToFile": async (
      _: IpcMainInvokeEvent,
      ...args: Parameters<typeof writePngUriToFile>
    ) => {
      return await writePngUriToFile(...args);
    },
    "fs:copyFileToTemp": async (
      _: IpcMainInvokeEvent,
      ...args: Parameters<typeof copyFileToTemp>
    ) => {
      return await copyFileToTemp(...args);
    },
    "fs:copyImageFileToTemp": async (
      _: IpcMainInvokeEvent,
      ...args: Parameters<typeof copyImageFileToTemp>
    ) => {
      return await copyImageFileToTemp(...args);
    },
    "fs:moveTempFileToImages": async (
      _: IpcMainInvokeEvent,
      ...args: Parameters<typeof moveTempFileToImages>
    ) => {
      return await moveTempFileToImages(...args);
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
