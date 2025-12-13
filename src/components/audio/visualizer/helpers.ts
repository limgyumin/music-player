export const amplifyAsymmetric = (
  value: number,
  threshold: number,
  upStrength = 1,
  downStrength = 1
): number => {
  const diff = value - threshold;

  if (diff > 0) {
    return threshold + Math.pow(diff, upStrength);
  } else if (diff < 0) {
    return threshold - Math.pow(Math.abs(diff), downStrength);
  } else {
    return threshold;
  }
};

export const sum = (array: Uint8Array | Array<number>): number => {
  return (array as any).reduce((prev: number, curr: number) => prev + curr, 0);
};

export const average = (array: Uint8Array | Array<number>): number => {
  return sum(array) / (array as any).length;
};
