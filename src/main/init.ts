import { access, mkdir } from "fs/promises";
import { getActualFilePath } from "../../data/utils.js";

async function isDirExisting(dir: string) {
  try {
    await access(dir);
    return true;
  } catch {
    return false;
  }
}

async function initializeDirectories() {
  const dirs = ["data", "data/images", "data/receipts", "data/temp"];
  for (const dir of dirs) {
    const absolute = getActualFilePath(dir);
    if (await isDirExisting(absolute)) continue;
    await mkdir(absolute);
  }
}

initializeDirectories();
