import { useEffect } from "react";

export const useFullscreen = () => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "KeyF") {
        return;
      }

      if (document.fullscreenElement == null) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
};
