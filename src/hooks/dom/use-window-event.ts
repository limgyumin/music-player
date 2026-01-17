import { useEffect, useRef } from "react";

export const useWindowEvent = <K extends keyof WindowEventMap>(
  event: K,
  callback: (e: WindowEventMap[K]) => void
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    window.addEventListener(event, callbackRef.current);

    return () => window.removeEventListener(event, callbackRef.current);
  }, [event]);
};
