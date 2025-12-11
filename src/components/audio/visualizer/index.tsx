import styles from "./index.module.css";
import { useAudio } from "../audio-provider/hooks";
import { useVisualizer } from "./hooks";
import { usePlaylist } from "../../music/playlist-provider/hooks";
import { useMusic } from "../../../hooks/music/use-music";

export const Visualizer = () => {
  const audio = useAudio();
  const playlist = usePlaylist();

  const { currentMusic } = useMusic(playlist);

  const { low, high } = useVisualizer(audio);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={styles["high-frequency-visualizer__wrapper"]}
          >
            <div
              className={styles["high-frequency-visualizer"]}
              style={{
                transform: `scale(${high + index / 10})`,
              }}
            />
          </div>
        ))}

        <div
          className={styles["low-frequency-visualizer"]}
          style={{
            transform: `scale(${low})`,
          }}
        >
          <img
            src={currentMusic.thumbnail}
            alt={currentMusic.title}
            className={styles["thumbnail"]}
          />
        </div>
      </div>
    </div>
  );
};
