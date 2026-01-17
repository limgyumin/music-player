export type Music = Readonly<{
  id: string;
  thumbnail: string;
  title: string;
  collection: string;
  artists: readonly string[];
  source: string;
}>;
