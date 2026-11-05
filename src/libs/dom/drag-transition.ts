export type DragPosition = [x: number, y: number];

export interface DragTransition {
  startTransition: (
    from: DragPosition,
    to: DragPosition,
    onUpdate: (position: DragPosition) => void,
  ) => void;

  cancelTransition: () => void;
}
