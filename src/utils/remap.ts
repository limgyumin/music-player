export const remap = (value: number, min: number, max: number): number => {
  return min + (max - min) * value;
};
