import { Music } from "./music";

export type Collection = Readonly<{
  id: string;
  thumbnail: string;
  musics: readonly Music[];
}>;
