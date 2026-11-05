import { useEffect, useRef } from "react";
import { Audio } from "../../../libs/audio";
import { amplifyAsymmetric, average } from "./helpers";

// 매 프레임 React state 를 바꾸면 컴포넌트 전체가 리렌더되므로, DOM 의 style 을 직접 바꾼다.
export const useVisualizer = (audio: Audio) => {
  const lowRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const frequency = audio.analyser.analyzeFrequency();

      const low = amplifyAsymmetric(
        average(frequency.slice(0, 64)),
        120,
        1.4,
        1.1
      );

      const mid = amplifyAsymmetric(
        average(frequency.slice(64, 128)),
        90,
        1.4,
        1.1
      );

      if (lowRef.current != null) {
        lowRef.current.style.transform = `scale(${1 + low / 1000})`;
      }

      if (midRef.current != null) {
        midRef.current.style.transform = `scale(${1 + mid / 1000})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(rafId);
  }, [audio]);

  return { lowRef, midRef };
};
