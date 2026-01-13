import { PropsWithChildren, useEffect } from "react";

import { usePlaylist } from "../playlist-provider/hooks";

import { useMusic } from "../../../hooks/music/use-music";
import { useDominantColor } from "../../../hooks/image/use-dominant-color";
import { isDark, resetBodyColor, setBodyColor } from "./helpers";

import styles from "./index.module.css";

export const Background = ({ children }: PropsWithChildren) => {
  const playlist = usePlaylist();
  const { currentMusic } = useMusic(playlist);

  const color = useDominantColor({ source: currentMusic.thumbnail });

  useEffect(() => {
    if (color !== undefined) {
      setBodyColor(color);
    }
  }, [color]);

  useEffect(() => resetBodyColor, []);

  const theme = color === undefined || !isDark(color) ? "light" : "dark";

  return (
    <div className={styles.container} data-theme={theme}>
      {children}
    </div>
  );
};
