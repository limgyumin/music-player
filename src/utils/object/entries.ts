export const entries = <T extends Record<string, any>>(
  object: T
): [keyof T, T[keyof T]][] => {
  return Object.entries(object) as [keyof T, T[keyof T]][];
};
