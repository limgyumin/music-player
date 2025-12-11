import { createContext } from "react";
import { Audio } from "../../../libs/audio";

export const AudioContext = createContext<Audio | null>(null);
