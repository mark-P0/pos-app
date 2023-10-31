import path from "path";

/**
 * Automatically negotiate between e.g. `<src-code-dir>/data/db.sqlite` in development
 * and `<portable-exe-dir>/data/db.sqlite` in production
 */
export function getActualFilePath(filepath: string) {
  const { PORTABLE_EXECUTABLE_DIR } = process.env;
  /**
   * In production, portable EXE will be created, and environment variable
   * `PORTABLE_EXECUTABLE_DIR` will be set to its containing directory.
   *
   * In development, source code directory is set as "current", hence the `"."`.
   */
  const appDir = PORTABLE_EXECUTABLE_DIR ?? ".";
  return path.join(appDir, filepath);
}
