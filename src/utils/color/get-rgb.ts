export const getRGB = (color: string): [r: number, g: number, b: number] => {
  const [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [];

  return [r, g, b];
};
