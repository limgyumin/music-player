import { DragPosition, DragTransition } from "./drag-transition";

type SmoothDragTransitionOptions = {
  speed: number;
};

export class SmoothDragTransition implements DragTransition {
  private readonly speed: number;

  private current: DragPosition = [0, 0];
  private target: DragPosition = [0, 0];

  private onUpdate: (position: DragPosition) => void = () => {};

  private frameId: number | null = null;

  constructor({ speed }: SmoothDragTransitionOptions) {
    this.speed = speed;
  }

  public startTransition = (
    from: DragPosition,
    to: DragPosition,
    onUpdate: (position: DragPosition) => void,
  ): void => {
    this.target = to;
    this.onUpdate = onUpdate;

    if (this.frameId != null) {
      return;
    }

    this.current = from;
    this.frameId = requestAnimationFrame(this.tick);
  };

  public cancelTransition = (): void => {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  };

  private tick = (): void => {
    const [currentX, currentY] = this.current;
    const [targetX, targetY] = this.target;

    const x = currentX + (targetX - currentX) * this.speed;
    const y = currentY + (targetY - currentY) * this.speed;

    if (Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1) {
      this.frameId = null;
      this.current = this.target;
      this.onUpdate(this.current);

      return;
    }

    this.current = [x, y];
    this.frameId = requestAnimationFrame(this.tick);
    this.onUpdate(this.current);
  };
}
