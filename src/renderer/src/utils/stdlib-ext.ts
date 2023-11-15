/**
 * "Extensions" to the standard library
 */
null;

export function raise(msg: string): never {
  throw new Error(msg);
}

export function sum(...numbers: number[]) {
  let res = 0;
  for (const num of numbers) res += num;
  return res;
}

/** https://stackoverflow.com/a/39914235 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
