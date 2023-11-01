import { contextBridge, ipcRenderer } from "electron";
import { Channel, HandlerArgs, HandlerValue } from "../main/ipc-handlers.js";

async function ipcInvoke<T extends Channel>(
  channel: T,
  ...args: HandlerArgs<T>
): Promise<HandlerValue<T>> {
  return await ipcRenderer.invoke(channel, ...args);
}

/**
 * Custom APIs for renderer
 *
 * On new additions to the API:
 * - Get the inferred type, e.g. via hover definitions (VSCode)
 * - Copy the inferred type into `src/preload/index.d.ts`
 *    - This is for IntelliSense in renderer files
 */
const api = { ipcInvoke };

/**
 * Use `contextBridge` APIs to expose Electron APIs to
 * renderer only if context isolation is enabled, otherwise
 * just add to the DOM global.
 */
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api;
}
