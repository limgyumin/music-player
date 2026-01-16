import { Music } from "./music";

export type Collection = Readonly<{
  id: string;
  title: string;
  musics: readonly Music[];
}>;
