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
  "fs:writePngUriToFile": async (
    _: IpcMainInvokeEvent,
    uri: Parameters<typeof writePngUriToFile>[0],
    filename: Parameters<typeof writePngUriToFile>[1],
  ) => {
    return await writePngUriToFile(uri, filename);
  },
  "fs:copyFileToTemp": async (
    _: IpcMainInvokeEvent,
    src: Parameters<typeof copyFileToTemp>[0],
  ) => {
    return await copyFileToTemp(src);
  },
  "fs:copyImageFileToTemp": async (
    _: IpcMainInvokeEvent,
    filename: Parameters<typeof copyImageFileToTemp>[0],
  ) => {
    return await copyImageFileToTemp(filename);
  },
  "fs:moveTempFileToImages": async (
    _: IpcMainInvokeEvent,
    src: Parameters<typeof moveTempFileToImages>[0],
    dest: Parameters<typeof moveTempFileToImages>[1],
  ) => {
    return await moveTempFileToImages(src, dest);
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
