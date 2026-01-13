import { drawImage, loadImage } from "../image";
import { quantize } from "../../utils/color";

export const getDominantColor = async (options: {
  source: string;
  sample?: number;
  factor?: number;
}): Promise<string | undefined> => {
  const { source, sample = 10, factor = 24 } = options;

  const image = await loadImage(source);
  const { data, width, height } = drawImage(image);

  const counts: Record<string, number> = {};

  let maxCount = 0;
  let color: string | undefined;

  for (let y = 0; y < height; y += sample) {
    for (let x = 0; x < width; x += sample) {
      const index = (y * width + x) * 4;

      const a = data[index + 3];

      if (a < 128) {
        continue;
      }

      // RGB 값을 factor 단위로 묶어서 유사한 색으로 취급한다.
      const r = quantize(data[index], factor);
      const g = quantize(data[index + 1], factor);
      const b = quantize(data[index + 2], factor);

      const key = `rgb(${r}, ${g}, ${b})`;

      const count = (counts[key] || 0) + 1;

      counts[key] = count;

      if (count > maxCount) {
        maxCount = count;
        color = key;
      }
    }
  }

  return color;
};
