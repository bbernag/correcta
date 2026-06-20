import {createContext} from "react";

import type {PocCardContextValue} from "./PocCardTypes";

export const PocCardContext = createContext<PocCardContextValue>({
    orientation: "vertical",
});
