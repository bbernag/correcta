import {createContext} from "react";

import type {PocCardContextValue} from "./pocCardTypes";

export const PocCardContext = createContext<PocCardContextValue>({
    orientation: "vertical",
    tone: "contrast",
});
