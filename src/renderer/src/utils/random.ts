export function random$int(from: number, to: number) {
  const range = to - from;
  return from + Math.floor(Math.random() * range);
}

export function random$intByLength(length: number) {
  return random$int(10 ** (length - 1), 10 ** length);
}

export function random$choice<T>(seq: ArrayLike<T>): T {
  const idx = random$int(0, seq.length);
  return seq[idx];
}

export function random$string(
  length: number,
  chars: ArrayLike<string> = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
) {
  return Array.from({ length }, () => random$choice(chars)).join("");
}
