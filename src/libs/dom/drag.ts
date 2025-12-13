export class Drag {
  private container: HTMLElement | null = null;
  private target: HTMLElement | null = null;

  private initialX: number = 0;
  private initialY: number = 0;

  private currentX: number = 0;
  private currentY: number = 0;

  private _isDragging = false;

  private readonly positionListeners: Set<() => void> = new Set();

  private readonly isDraggingListeners: Set<() => void> = new Set();

  get position(): [number, number] {
    return [this.currentX, this.currentY];
  }

  private set position(value: [number, number]) {
    const [x, y] = value;

    this.currentX = x;
    this.currentY = y;

    this.positionListeners.forEach((listener) => listener());
  }

  get isDragging(): boolean {
    return this._isDragging;
  }

  private set isDragging(value: boolean) {
    this._isDragging = value;
    this.isDraggingListeners.forEach((listener) => listener());
  }

  private dragStart = (e: MouseEvent): void => {
    if (this.target == null) {
      return;
    }

    const { clientX, clientY } = e;

    this.initialX = clientX;
    this.initialY = clientY;

    if (e.target === this.target || this.target.contains(e.target as Node)) {
      this.isDragging = true;
    }
  };

  private dragEnd = (): void => {
    this.initialX = 0;
    this.initialY = 0;

    this.isDragging = false;

    this.position = [0, 0];
  };

  private drag = (e: MouseEvent): void => {
    if (!this.isDragging) {
      return;
    }

    e.preventDefault();

    const { clientX, clientY } = e;

    this.position = [clientX - this.initialX, clientY - this.initialY];
  };

  public subscribePosition = (callback: () => void): (() => void) => {
    this.positionListeners.add(callback);

    return () => this.positionListeners.delete(callback);
  };

  public subscribeIsDragging = (callback: () => void): (() => void) => {
    this.isDraggingListeners.add(callback);

    return () => this.isDraggingListeners.delete(callback);
  };

  public connect = (
    container: HTMLElement,
    target: HTMLElement
  ): (() => void) => {
    this.container = container;
    this.target = target;

    this.container.addEventListener("mousedown", this.dragStart);
    this.container.addEventListener("mouseup", this.dragEnd);
    this.container.addEventListener("mousemove", this.drag);

    return () => {
      this.container?.removeEventListener("mousedown", this.dragStart);
      this.container?.removeEventListener("mouseup", this.dragEnd);
      this.container?.removeEventListener("mousemove", this.drag);
    };
  };
}
