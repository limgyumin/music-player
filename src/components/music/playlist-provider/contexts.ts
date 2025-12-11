import { createContext } from "react";
import { Playlist } from "../../../libs/music";

export const PlaylistContext = createContext<Playlist | null>(null);
