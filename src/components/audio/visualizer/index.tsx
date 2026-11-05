import styles from "./index.module.css";
import { useAudio } from "../audio-provider/hooks";
import { useVisualizer } from "./hooks";
import { usePlaylist } from "../../music/playlist-provider/hooks";
import { useMusic } from "../../../hooks/music/use-music";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDrag } from "../../ui/drag/hooks";
import { useIsDragging } from "../../../hooks/dom/use-is-dragging";
import { clamp } from "../../../utils/number";

const FILTER_SWEEP_DISTANCE = 240;

export const Visualizer = forwardRef<HTMLDivElement>((_, ref) => {
  const audio = useAudio();
  const playlist = usePlaylist();
  const drag = useDrag();

  const { currentMusic } = useMusic(playlist);

  const { lowRef, midRef } = useVisualizer(audio);

  const isDragging = useIsDragging(drag);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement, []);

  useEffect(() => {
    const update = () => {
      const [x, y] = drag.position;

      if (wrapperRef.current != null) {
        wrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      audio.panner.pan = [x / 200, -y / 200];
      audio.filter.sweep = clamp(-y / FILTER_SWEEP_DISTANCE, -1, 1);
    };

    update();

    return drag.subscribePosition(update);
  }, [audio, drag]);

  return (
    <div className={styles.container}>
      <div
        ref={wrapperRef}
        className={styles.wrapper}
        data-dragging={isDragging}
      >
        <div className={styles["mid-frequency-visualizer__wrapper"]}>
          <div ref={midRef} className={styles["mid-frequency-visualizer"]} />
        </div>

        <div ref={lowRef} className={styles["low-frequency-visualizer"]}>
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
