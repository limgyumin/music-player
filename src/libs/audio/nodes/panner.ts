import { Attachable } from "./attachable";

const DISTANCE = 1.5;

const SMOOTHING = 0.08;

export class Panner implements Attachable {
  private readonly context: AudioContext;

  private readonly node: PannerNode;

  constructor(context: AudioContext) {
    this.context = context;

    const listener = context.listener;

    listener.positionX.value = 0;
    listener.positionY.value = 0;
    listener.positionZ.value = 0;

    this.node = new PannerNode(context, {
      panningModel: "HRTF",
      distanceModel: "inverse",
      positionX: 0,
      positionY: 0,
      positionZ: -DISTANCE,
      maxDistance: 10000,
      refDistance: DISTANCE,
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

    const now = this.context.currentTime;

    this.node.positionX.setTargetAtTime(x, now, SMOOTHING);
    this.node.positionY.setTargetAtTime(y, now, SMOOTHING);
  }

  public attachTo = (node: AudioNode): AudioNode => {
    return node.connect(this.node);
  };
}
