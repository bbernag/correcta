import {Host as ExpoHost} from "@expo/ui";

import type {NativeHostProps} from "./NativeHostTypes";

export function NativeHost({children, ...hostProps}: NativeHostProps) {
    return <ExpoHost {...hostProps}>{children}</ExpoHost>;
}
