import { Attachable } from "./attachable";

export class Panner implements Attachable {
  private readonly node: PannerNode;

  private readonly initialX: number;
  private readonly initialY: number;
  private readonly initialZ: number;

  constructor(context: AudioContext) {
    const listener = context.listener;

    this.initialX = window.innerWidth / 2;
    this.initialY = window.innerHeight / 2;
    this.initialZ = 300;

    listener.positionX.value = this.initialX;
    listener.positionY.value = this.initialY;
    listener.positionZ.value = this.initialZ;

    this.node = new PannerNode(context, {
      panningModel: "HRTF",
      distanceModel: "linear",
      positionX: this.initialX,
      positionY: this.initialY,
      positionZ: this.initialZ,
      maxDistance: 10000,
      refDistance: 1,
      rolloffFactor: 5,
      orientationX: 0,
      orientationY: 0,
      orientationZ: -1,
      coneInnerAngle: 60,
      coneOuterAngle: 90,
      coneOuterGain: 0.75,
    });
  }

  public get position(): [number, number, number] {
    return [this.initialX, this.initialY, this.initialZ];
  }

  public get maxDistance(): number {
    return this.node.maxDistance;
  }

  public set pan(position: [number, number]) {
    const [x, y] = position;

    this.node.positionX.value = x;
    this.node.positionY.value = y;
  }

  public attachTo = (node: AudioNode): AudioNode => {
    return node.connect(this.node);
  };
}
