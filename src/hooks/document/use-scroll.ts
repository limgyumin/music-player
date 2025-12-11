import { RefObject, useEffect, useRef } from "react";

type UseScrollCallback = (options: { progressY: number }) => void;

type UseScrollOptions = {
  ref?: RefObject<HTMLElement | null>;
  callback: UseScrollCallback;
};

export const useScroll = (options: UseScrollOptions) => {
  const { ref, callback } = options;

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const target = ref?.current ?? window;

    const handleScroll = () => {
      const element = ref?.current ?? document.documentElement;

      const { scrollTop: top, scrollHeight, clientHeight } = element;

      const height = scrollHeight - clientHeight;

      callbackRef.current({ progressY: top / height });
    };

    handleScroll();

    target.addEventListener("scroll", handleScroll);

    return () => target.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
