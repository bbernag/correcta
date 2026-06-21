import {createContext} from "react";

import type {ConnectedCardContextValue} from "./connectedCardTypes";

export const ConnectedCardContext =
    createContext<ConnectedCardContextValue | null>(null);
