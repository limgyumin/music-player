export const amplifyAsymmetric = (
  value: number,
  center: number,
  upStrength = 1,
  downStrength = 1
): number => {
  const diff = value - center;

  if (diff > 0) {
    return center + Math.pow(diff, upStrength);
  } else if (diff < 0) {
    return center - Math.pow(Math.abs(diff), downStrength);
  } else {
    return center;
  }
};

export const average = (value: Uint8Array): number => {
  return value.reduce((acc, curr) => acc + curr, 0) / value.length;
};
