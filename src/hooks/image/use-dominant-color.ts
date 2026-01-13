import { useEffect, useState } from "react";
import { getDominantColor } from "../../libs/color";

type UseDominantColorOptions = {
  source: string;
  sample?: number;
  factor?: number;
};

export const useDominantColor = (options: UseDominantColorOptions) => {
  const { source, sample = 10, factor = 24 } = options;

  const [color, setColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    getDominantColor({ source, sample, factor }).then(setColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, sample, factor]);

  return color;
};
