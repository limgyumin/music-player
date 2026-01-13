import { getLuminance, getRGB } from "../../../utils/color";

export const isDark = (color: string): boolean => {
  return getLuminance(...getRGB(color)) < 0.5;
};

export const setBodyColor = (color: string) => {
  document.body.style.transition = "background-color 0.5s ease-in-out";
  document.body.style.backgroundColor = color;
};

export const resetBodyColor = () => {
  document.body.style.removeProperty("transition");
  document.body.style.removeProperty("background-color");
};
