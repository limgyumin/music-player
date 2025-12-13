import { useContext } from "react";
import { DragContext } from "./contexts";

export const useDragContext = () => {
  const context = useContext(DragContext);

  if (context == null) {
    throw new Error("useDragContext must be used within a DragContext");
  }

  return context;
};

export const useDrag = () => {
  const { drag } = useDragContext();

  return drag;
};
