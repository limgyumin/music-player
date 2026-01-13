export const getLuminance = (r: number, g: number, b: number): number => {
  // WCAG 의 상대 휘도 공식을 적용한다.
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};
