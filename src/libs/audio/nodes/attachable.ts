export interface Attachable {
  attachTo: (node: AudioNode) => AudioNode;
}
