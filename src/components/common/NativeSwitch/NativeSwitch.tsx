import {Switch as ExpoSwitch} from "@expo/ui";

import {NativeHost} from "../NativeHost";
import type {NativeSwitchProps} from "./NativeSwitchTypes";

export function NativeSwitch({
    accessibilityLabel,
    disabled,
    label,
    onValueChange,
    style,
    testID,
    value,
}: NativeSwitchProps) {
    return (
        <NativeHost
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityRole="switch"
            accessibilityState={{checked: value, disabled}}
            matchContents
            style={style}
        >
            <ExpoSwitch
                disabled={disabled}
                label={label}
                onValueChange={onValueChange}
                testID={testID}
                value={value}
            />
        </NativeHost>
    );
}
