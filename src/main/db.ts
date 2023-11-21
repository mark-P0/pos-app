import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  NewProduct,
  NewUser,
  Product,
  User,
  createDb,
  products,
  users,
} from "../../data/schema.js";
import { getActualFilePath, isPathExisting } from "../../data/utils.js";
import { hash, isHashOf } from "./auth.js";

const DB_FILE_PATH = getActualFilePath("data/data.sqlite");
if (!isPathExisting(DB_FILE_PATH)) {
  createDb(DB_FILE_PATH);
}

const sqlite = new Database(DB_FILE_PATH, { fileMustExist: true });
const db = drizzle(sqlite);

export async function getAllProducts() {
  return await db.select().from(products);
}

export async function addProduct(product: NewProduct) {
  return await db.insert(products).values(product);
}

export async function deleteProduct(sku: Product["sku"]) {
  await db.delete(products).where(eq(products.sku, sku));
}

export async function editProduct(product: Product) {
  await db.update(products).set(product).where(eq(products.sku, product.sku));
}

export async function getProduct(sku: Product["sku"]) {
  const res = await db.select().from(products).where(eq(products.sku, sku));
  if (res.length === 0) {
    throw new Error(`Product of SKU \`${sku}\` does not exist!`);
  }
  /* Should be impossible as the username is a primary key */
  if (res.length > 1) {
    throw new Error(`There are multiple products of the SKU \`${sku}\`!`);
  }

  return res[0];
}

export async function isSKUExisting(sku: Product["sku"]) {
  try {
    await getProduct(sku);
    return true;
  } catch {
    return false;
  }
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

export async function isUsernameExisting(username: User["username"]) {
  try {
    await getUser(username);
    return true;
  } catch {
    return false;
  }
}
export async function isPasswordCorrect(user: User) {
  try {
    const record = await getUser(user.username);
    return await isHashOf(record.password, user.password);
  } catch {
    return false;
  }
}