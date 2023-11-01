import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import { products } from "./schema.js";

const { PORTABLE_EXECUTABLE_DIR } = process.env;
const APP_DIR = PORTABLE_EXECUTABLE_DIR ?? ".";
const DB_FILE_PATH = path.join(APP_DIR, "data", "data.sqlite");

const sqlite = new Database(DB_FILE_PATH);
const db = drizzle(sqlite);

export async function getAllProducts() {
  return await db.select().from(products);
}
