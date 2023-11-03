/** https://github.com/ranisalt/node-argon2 */

import argon2 from "argon2";

export async function hash(value: string) {
  try {
    return await argon2.hash(value);
  } catch (error) {
    console.error(error);
    throw new Error("Hashing failed");
  }
}

export async function isHashOf(targetHash: string, value: string) {
  try {
    return await argon2.verify(targetHash, value);
  } catch (error) {
    console.error(error);
    throw new Error("Hash comparison failed");
  }
}
