import { createContext } from "react";
import { Controller } from "../../../libs/music";

export const ControllerContext = createContext<Controller | null>(null);
