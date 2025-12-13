import { useSyncExternalStore } from "react";
import { Controller } from "../../libs/music/controller";

export const useIsRepeat = (controller: Controller) => {
  return useSyncExternalStore(
    controller.subscribeIsRepeat,
    () => controller.isRepeat,
    () => controller.isRepeat
  );
};
