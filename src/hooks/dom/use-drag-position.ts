import { useRef, useSyncExternalStore } from "react";
import { Drag } from "../../libs/dom";

export const useDragPosition = (drag: Drag) => {
  const snapshot = useRef<[number, number]>(drag.position);

  const getSnapshot = (current: [number, number]) => {
    if (
      current[0] !== snapshot.current[0] ||
      current[1] !== snapshot.current[1]
    ) {
      snapshot.current = current;
    }

    return snapshot.current;
  };

  return useSyncExternalStore(
    drag.subscribePosition,
    () => getSnapshot(drag.position),
    () => getSnapshot(drag.position)
  );
};
