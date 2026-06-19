import {createContext, use} from "react";

import type {CardUnionContextValue} from "./CardUnionTypes";

export const CardUnionContext = createContext<CardUnionContextValue | null>(
    null
);

export function useCardUnionContext() {
    const context = use(CardUnionContext);

    if (!context) {
        throw new Error("CardUnion.Item must be rendered inside CardUnion.");
    }

    return context;
}
