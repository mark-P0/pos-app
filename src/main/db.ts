import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { createDb } from "./db/schema.js";
import { getActualFilePath, isPathExisting } from "./utils.js";

const DB_FILE_PATH = getActualFilePath("data/data.sqlite");
if (!isPathExisting(DB_FILE_PATH)) {
  createDb(DB_FILE_PATH);
}

const sqlite = new Database(DB_FILE_PATH, { fileMustExist: true });
export const db = drizzle(sqlite);
