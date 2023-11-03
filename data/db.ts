import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import { hash } from "./auth.js";
import { NewUser, User, products, users } from "./schema.js";

const { PORTABLE_EXECUTABLE_DIR } = process.env;
const APP_DIR = PORTABLE_EXECUTABLE_DIR ?? ".";
const DB_FILE_PATH = path.join(APP_DIR, "data", "data.sqlite");

const sqlite = new Database(DB_FILE_PATH);
const db = drizzle(sqlite);

export async function getAllProducts() {
  return await db.select().from(products);
}

export async function addUser(user: NewUser) {
  let { password } = user;
  password = await hash(password);

  await db.insert(users).values({ ...user, password });
}

export async function deleteUser(username: User["username"]) {
  await db.delete(users).where(eq(users.username, username));
}
