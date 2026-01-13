export const quantize = (value: number, factor: number): number => {
  return Math.round(value / factor) * factor;
};
