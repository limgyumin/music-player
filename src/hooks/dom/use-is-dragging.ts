import { useSyncExternalStore } from "react";
import { Drag } from "../../libs/dom/drag";

export const useIsDragging = (drag: Drag) => {
  return useSyncExternalStore(
    drag.subscribeIsDragging,
    () => drag.isDragging,
    () => drag.isDragging
  );
};
