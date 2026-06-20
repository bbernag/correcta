import {Collapsible as ExpoCollapsible, RNHostView} from "@expo/ui";

import {NativeHost} from "../NativeHost";
import type {NativeCollapsibleProps} from "./nativeCollapsibleTypes";

export function NativeCollapsible({
    accessibilityLabel,
    children,
    isOpen,
    label,
    labelStyle,
    onOpenChange,
    style,
}: NativeCollapsibleProps) {
    return (
        <NativeHost
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityRole="button"
            accessibilityState={{expanded: isOpen}}
            matchContents
            style={style}
        >
            <ExpoCollapsible
                isOpen={isOpen}
                label={label}
                labelStyle={labelStyle}
                onOpenChange={onOpenChange}
            >
                {children ? (
                    <RNHostView matchContents>{children}</RNHostView>
                ) : null}
            </ExpoCollapsible>
        </NativeHost>
    );
}
