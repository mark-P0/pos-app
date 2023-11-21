import { accessSync } from "fs";
import { copyFile, rename, writeFile } from "fs/promises";
import path from "path";

/**
 * Automatically negotiate between e.g. `<SRC_CODE_DIR>/data/db.sqlite` in development
 * and `<PORTABLE_EXE_DIR>/data/db.sqlite` in production
 */
export function getActualFilePath(...filepath: string[]) {
  const { PORTABLE_EXECUTABLE_DIR } = process.env;
  /**
   * In production, portable EXE will be created, and environment variable
   * `PORTABLE_EXECUTABLE_DIR` will be set to its containing directory.
   *
   * In development, source code directory is treated as "current", hence the `"."`.
   */
  const appDir = PORTABLE_EXECUTABLE_DIR ?? ".";
  return path.join(appDir, ...filepath);
}

export function isPathExisting(path: string) {
  try {
    accessSync(path);
    return true;
  } catch {
    return false;
  }
}

/** https://stackoverflow.com/a/77266873 */
export async function writePngUriToFile(uri: string, filename: string) {
  const [, base64Data] = uri.split(",");
  await writeFile(getActualFilePath(filename), base64Data, "base64");
}

export async function copyFileToTemp(src: string) {
  const filename = path.basename(src);
  const dest = getActualFilePath(`data/temp/${filename}`);
  await copyFile(src, dest);
}

export async function copyImageFileToTemp(filename: string) {
  const src = getActualFilePath(`data/images/${filename}`);
  const dest = getActualFilePath(`data/temp/${filename}`);
  await copyFile(src, dest);
}

export async function moveTempFileToImages(src: string, dest: string) {
  await rename(
    getActualFilePath(`data/temp/${src}`),
    getActualFilePath(`data/images/${dest}`),
  );
}
