`
- https://stackoverflow.com/a/77369455
- https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
`;

import { app, net, protocol } from "electron";
import { pathToFileURL } from "node:url";
import { getActualFilePath } from "../../data/utils.js";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "pos-app",
    privileges: { bypassCSP: true },
  },
]);

app.whenReady().then(() => {
  protocol.handle("pos-app", (req) => {
    const { pathname } = new URL(req.url);
    const filepath = getActualFilePath(pathname);
    const url = pathToFileURL(filepath);

    /**
     * `net` can fetch `file:///`
     *
     * https://www.electronjs.org/docs/latest/api/net#netfetchinput-init
     */
    return net.fetch(url.toString());
  });
});
