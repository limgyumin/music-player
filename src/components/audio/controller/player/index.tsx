import {
  FaBackwardStep,
  FaForwardStep,
  FaPause,
  FaPlay,
} from "react-icons/fa6";
import styles from "./index.module.css";
import { useIsPlaying } from "../../../../hooks/audio";
import { useAudio } from "../../audio-provider/hooks";
import { useController } from "../../../music/controller-provider/hooks";
import { useEffect } from "react";

export const Player = () => {
  const audio = useAudio();
  const controller = useController();

  const isPlaying = useIsPlaying(audio);

  useEffect(() => {
    return controller.playAutomatically();
  }, [controller]);

  return (
    <div className={styles.container}>
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
    </div>
  );
};
