import { useContext } from "react";
import { ControllerContext } from "./contexts";

export const useController = () => {
  const controller = useContext(ControllerContext);

  if (controller == null) {
    throw new Error("useController must be used within a ControllerProvider");
  }

  return controller;
};
