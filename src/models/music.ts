export type Music = Readonly<{
  id: string;
  thumbnail: string;
  title: string;
  artists: readonly string[];
  source: string;
}>;
