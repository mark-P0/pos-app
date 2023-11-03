import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import { hash, isHashOf } from "./auth.js";
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

export async function getUser(username: User["username"]) {
  const res = await db.select().from(users).where(eq(users.username, username));
  if (res.length === 0) {
    throw new Error(`User \`${username}\` does not exist!`);
  }
  /* Should be impossible as the username is a primary key */
  if (res.length > 1) {
    throw new Error(`There are multiple users of the name \`${username}\`!`);
  }

  return res[0];
}

export async function isUserValid(user: User) {
  let record: User;
  try {
    record = await getUser(user.username);
  } catch {
    return false;
  }

  return await isHashOf(record.password, user.password);
}
