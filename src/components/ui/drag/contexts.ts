import { createContext } from "react";
import { Drag } from "../../../libs/dom";

export type DragContextValue = {
  setTarget: (element: HTMLElement | null) => void;
  drag: Drag;
};

export const DragContext = createContext<DragContextValue | null>(null);
