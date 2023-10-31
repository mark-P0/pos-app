import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { Product, products } from "./schema.js";
import { getActualFilePath } from "./utils.js";

const sqlite = new Database(getActualFilePath("data/data.sqlite"));
const db = drizzle(sqlite);

export async function getAllProducts(): Promise<Product[]> {
  return await db.select().from(products);
}
