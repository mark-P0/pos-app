import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { hash, isHashOf } from "./auth.js";
import { NewUser, User, users } from "./schema.js";

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
