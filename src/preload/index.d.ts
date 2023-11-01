import { Channel, HandlerArgs, HandlerValue } from "../main/ipc-handlers.js";

declare global {
  interface Window {
    api: {
      ipcInvoke: <T extends Channel>(
        channel: T,
        ...args: HandlerArgs<T>
      ) => Promise<HandlerValue<T>>;
    };
  }
}
