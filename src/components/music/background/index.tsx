import { PropsWithChildren } from "react";
import { usePlaylist } from "../playlist-provider/hooks";
import { useMusic } from "../../../hooks/music/use-music";
import { DominantColorBackground } from "../../ui/dominant-color-background";
import styles from "./index.module.css";

export const Background = ({ children }: PropsWithChildren) => {
  const playlist = usePlaylist();
  const { currentMusic } = useMusic(playlist);

  return (
    <DominantColorBackground
      className={styles.container}
      source={currentMusic.thumbnail}
    >
      {children}
    </DominantColorBackground>
  );
};
