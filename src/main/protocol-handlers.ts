/**
 * - https://stackoverflow.com/a/77369455
 * - https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
 */

import { CustomScheme, app, net, protocol } from "electron";
import { pathToFileURL } from "url";
import { getActualFilePath } from "./utils.js";

type SchemeHandler = Parameters<typeof protocol.handle>[1];

const SchemeHandlers: [CustomScheme, SchemeHandler][] = [
  [
    { scheme: "pos-app", privileges: { bypassCSP: true } },
    (req: Request) => {
      const { pathname } = new URL(req.url);
      const filepath = getActualFilePath(pathname);
      const url = pathToFileURL(filepath);

      /**
       * `net` can fetch `file:///`
       * - https://www.electronjs.org/docs/latest/api/net#netfetchinput-init
       */
      return net.fetch(url.toString());
    },
  ],
];

const schemes = SchemeHandlers.map(([scheme]) => scheme);
protocol.registerSchemesAsPrivileged(schemes);

app.whenReady().then(() => {
  for (const [scheme, handler] of SchemeHandlers) {
    const schemeName = scheme.scheme;
    protocol.handle(schemeName, handler);
  }
});
