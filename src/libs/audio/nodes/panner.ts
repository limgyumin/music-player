import { Attachable } from "./attachable";

export class Panner implements Attachable {
  private readonly node: PannerNode;

  constructor(context: AudioContext) {
    const listener = context.listener;

    listener.positionX.value = 0;
    listener.positionY.value = 0;
    listener.positionZ.value = 0;

    this.node = new PannerNode(context, {
      panningModel: "HRTF",
      distanceModel: "linear",
      positionX: 0,
      positionY: 0,
      positionZ: 1.5,
      maxDistance: 10000,
      refDistance: 1,
      rolloffFactor: 1,
      orientationX: 0,
      orientationY: 0,
      orientationZ: -1,
      coneInnerAngle: 360,
      coneOuterAngle: 0,
      coneOuterGain: 0,
    });
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
