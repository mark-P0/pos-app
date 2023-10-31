import { app, ipcMain } from "electron";
import fs from "node:fs/promises";
import path from "node:path";
import { getAllProducts } from "../../data/db.js";

ipcMain.handle("db:getAllProducts", async () => {
  try {
    return await getAllProducts();
  } catch (error) {
    console.error(error);
  }
  return [];
});

ipcMain.handle("DELETEME", () => {
  const env = { ...process.env };

  const appPath = app.getAppPath();
  const exePath = app.getPath("exe");
  const resolvePath = path.resolve(".");
  const {
    PORTABLE_EXECUTABLE_FILE,
    PORTABLE_EXECUTABLE_DIR,
    PORTABLE_EXECUTABLE_APP_FILENAME,
  } = env;

  return {
    appPath,
    exePath,
    resolvePath,
    PORTABLE_EXECUTABLE_FILE,
    PORTABLE_EXECUTABLE_DIR,
    PORTABLE_EXECUTABLE_APP_FILENAME,
    env,
  };
});

ipcMain.handle("fs:getImgAsBase64", async (_, imgPath) => {
  const ext = path.extname(imgPath);
  const data = await fs.readFile(imgPath, { encoding: "base64" });
  return `data:image/${ext};base64,${data}`;
});

ipcMain.handle("fs:getImgAsBlobUri", async (_, imgPath) => {
  const file = await fs.readFile(imgPath);
  const blob = new Blob([file]);
  const url = URL.createObjectURL(blob);
  return url;
});
