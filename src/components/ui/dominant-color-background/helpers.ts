export const loadImage = (source: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.src = source;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

export const quantize = (value: number, factor: number): number => {
  return Math.round(value / factor) * factor;
};

export const getDominantColor = async (options: {
  source: string;
  sample?: number;
  factor?: number;
}): Promise<string | undefined> => {
  const { source, sample = 10, factor = 24 } = options;

  const image = await loadImage(source);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context == null) {
    throw new Error("Failed to get context");
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  context.drawImage(image, 0, 0);

  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

  const colorCount: Record<string, number> = {};

  let maxCount = 0;
  let dominantColor: string | undefined;

  for (let y = 0; y < canvas.height; y += sample) {
    for (let x = 0; x < canvas.width; x += sample) {
      const index = (y * canvas.width + x) * 4;

      const a = data[index + 3];

      if (a < 128) {
        continue;
      }

      // RGB 값을 factor 단위로 묶어서 유사한 색으로 취급한다.
      const r = quantize(data[index], factor);
      const g = quantize(data[index + 1], factor);
      const b = quantize(data[index + 2], factor);

      const key = `rgb(${r}, ${g}, ${b})`;

      const count = (colorCount[key] || 0) + 1;

      colorCount[key] = count;

      if (count > maxCount) {
        maxCount = count;
        dominantColor = key;
      }
    }
  }

  return dominantColor;
};

export const getLuminance = (r: number, g: number, b: number): number => {
  // WCAG 의 상대 휘도 공식을 적용한다.
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

export const getRGB = (color: string): [r: number, g: number, b: number] => {
  const [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [];

  return [r, g, b];
};

export const isDark = (color: string): boolean => {
  return getLuminance(...getRGB(color)) < 0.5;
};
