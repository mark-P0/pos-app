import { IpcMainInvokeEvent, app, ipcMain, nativeTheme } from "electron";
import { copyFile, rename, writeFile } from "fs/promises";
import path from "path";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  isPasswordCorrect,
  isSKUExisting,
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
  "db:isUsernameExisting": async (
    _: IpcMainInvokeEvent,
    username: Parameters<typeof isUsernameExisting>[0],
  ) => {
    return await isUsernameExisting(username);
  },
  "db:isPasswordCorrect": async (
    _: IpcMainInvokeEvent,
    password: Parameters<typeof isPasswordCorrect>[0],
  ) => {
    return await isPasswordCorrect(password);
  },
  "db:isSKUExisting": async (
    _: IpcMainInvokeEvent,
    sku: Parameters<typeof isSKUExisting>[0],
  ) => {
    return await isSKUExisting(sku);
  },
  "db:addProduct": async (
    _: IpcMainInvokeEvent,
    product: Parameters<typeof addProduct>[0],
  ) => {
    return await addProduct(product);
  },
  "db:deleteProduct": async (
    _: IpcMainInvokeEvent,
    sku: Parameters<typeof deleteProduct>[0],
  ) => {
    await deleteProduct(sku);
  },
  "db:editProduct": async (
    _: IpcMainInvokeEvent,
    product: Parameters<typeof editProduct>[0],
  ) => {
    await editProduct(product);
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
  "fs:copyFileToTemp": async (_: IpcMainInvokeEvent, src: string) => {
    const filename = path.basename(src);
    const dest = getActualFilePath(`data/temp/${filename}`);
    await copyFile(src, dest);
  },
  "fs:copyImageFileToTemp": async (_: IpcMainInvokeEvent, filename: string) => {
    const src = getActualFilePath(`data/images/${filename}`);
    const dest = getActualFilePath(`data/temp/${filename}`);
    await copyFile(src, dest);
  },
  "fs:moveTempFileToImages": async (
    _: IpcMainInvokeEvent,
    src: string,
    dest: string,
  ) => {
    await rename(
      getActualFilePath(`data/temp/${src}`),
      getActualFilePath(`data/images/${dest}`),
    );
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
