import { accessSync, mkdirSync } from "fs";
import { getActualFilePath } from "../../data/utils.js";

function isPathExisting(dir: string) {
  try {
    accessSync(dir);
    return true;
  } catch {
    return false;
  }
}

function initializeDirectories() {
  const dirs = ["data", "data/images", "data/receipts", "data/temp"];
  for (const dir of dirs) {
    const absolute = getActualFilePath(dir);
    if (isPathExisting(absolute)) continue;
    mkdirSync(absolute);
  }
}

initializeDirectories();
