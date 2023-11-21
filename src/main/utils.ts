import { accessSync } from "fs";
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
