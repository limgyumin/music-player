import { useEffect } from "react";
import {
  FaBackwardStep,
  FaForwardStep,
  FaPause,
  FaPlay,
  FaRepeat,
} from "react-icons/fa6";
import styles from "./index.module.css";
import { useIsPlaying } from "../../../../hooks/audio";
import { useAudio } from "../../audio-provider/hooks";
import { useController } from "../../../music/controller-provider/hooks";
import { useIsRepeat } from "../../../../hooks/music/use-is-repeat";

export const Player = () => {
  const audio = useAudio();
  const controller = useController();

  const isPlaying = useIsPlaying(audio);
  const isRepeat = useIsRepeat(controller);

  useEffect(() => {
    return controller.resume();
  }, [controller]);

  return (
    <div className={styles.container}>
      <div style={{ width: "32px", height: "32px" }} />

      <button className={styles["icon-button"]} onClick={controller.previous}>
        <FaBackwardStep />
      </button>

      <button
        className={styles["icon-button"]}
        onClick={() => controller.playback()}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button className={styles["icon-button"]} onClick={controller.next}>
        <FaForwardStep />
      </button>

      <button
        className={`${styles["icon-button"]} ${styles["toggle"]}`}
        data-active={isRepeat}
        onClick={controller.repeat}
      >
        <FaRepeat />
      </button>
    </div>
  );
};
