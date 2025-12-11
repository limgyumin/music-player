import { ChangeEventHandler, useEffect, useRef } from "react";
import { useTimeline } from "../../../../hooks/audio";
import { useAudio } from "../../audio-provider/hooks";
import { Slider } from "../../../ui/slider";
import styles from "./index.module.css";
import { formatTime } from "./helpers";

export const Timeline = () => {
  const audio = useAudio();

  const { time, duration } = useTimeline(audio);

  const currentTimeRef = useRef(time);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    audio.timeline.time = Number(value);
  };

  const handleMouseDown = () => {
    audio.timeline.startJump();

    // 간헐적으로 드래그가 slider 를 벗어나는 경우 mousedown 이벤트가 누락되므로 전체 document 대상으로 이벤트 추적
    const up = () => {
      audio.timeline.jumpTo(currentTimeRef.current);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mouseup", up);
  };

  useEffect(() => {
    currentTimeRef.current = time;
  }, [time]);

  return (
    <div className={styles.container}>
      <Slider
        value={time}
        min={0}
        max={duration}
        step={0.1}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
      />

      <div className={styles.time}>
        <span>{formatTime(time)}</span>
        <span>-{formatTime(duration - time)}</span>
      </div>
    </div>
  );
};
