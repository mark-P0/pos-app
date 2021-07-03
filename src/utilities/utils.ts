function randomInteger(lower: number, upper: number): number {
  /* Sanitizes arguments */
  // if (lower > upper) [lower, upper] = [upper, lower]; // Swap incorrectly ordered bounds
  // [upper, lower] = [upper, lower].map((num) => Math.floor(num)); // Ensure bounds are integers

  upper++; // For including upper bound

  let diff = upper - lower;
  let initRandom = Math.floor(Math.random() * diff);
  return initRandom + lower;
}

function randomizedCSSrgb(): string {
  let intArray = Array.from({ length: 3 }, () => randomInteger(128, 255));
  return `rgb(${intArray.join(',')})`;
}

export { randomInteger, randomizedCSSrgb };
