import styles from "./index.module.css";
import { useAudio } from "../audio-provider/hooks";
import { useVisualizer } from "./hooks";
import { usePlaylist } from "../../music/playlist-provider/hooks";
import { useMusic } from "../../../hooks/music/use-music";
import { forwardRef, useEffect } from "react";
import { useDrag } from "../../ui/drag/hooks";
import { useDragPosition } from "../../../hooks/dom/use-drag-position";
import { useIsDragging } from "../../../hooks/dom/use-is-dragging";

export const Visualizer = forwardRef<HTMLDivElement>((_, ref) => {
  const audio = useAudio();
  const playlist = usePlaylist();
  const drag = useDrag();

  const { currentMusic } = useMusic(playlist);

  const { low, mid } = useVisualizer(audio);

  const [x, y] = useDragPosition(drag);
  const isDragging = useIsDragging(drag);

  useEffect(() => {
    const [initialX, initialY] = audio.panner.position;

    const panX = (x / initialX) * (audio.panner.maxDistance / 2);
    const panY = (y / initialY) * (audio.panner.maxDistance / 2);

    audio.panner.pan = [panX, panY];
  }, [audio, x, y]);

  return (
    <div className={styles.container}>
      <div
        ref={ref}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        className={styles.wrapper}
        data-dragging={isDragging}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={styles["mid-frequency-visualizer__wrapper"]}
          >
            <div
              className={styles["mid-frequency-visualizer"]}
              style={{
                transform: `scale(${mid + index / 10})`,
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
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
});
