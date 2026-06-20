import {Checkbox as ExpoCheckbox} from "@expo/ui";

import {NativeHost} from "../NativeHost";
import type {NativeCheckboxProps} from "./nativeCheckboxTypes";

export function NativeCheckbox({
    accessibilityLabel,
    disabled,
    label,
    onValueChange,
    style,
    testID,
    value,
}: NativeCheckboxProps) {
    return (
        <NativeHost
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityRole="checkbox"
            accessibilityState={{checked: value, disabled}}
            matchContents
            style={style}
        >
            <ExpoCheckbox
                disabled={disabled}
                label={label}
                onValueChange={onValueChange}
                testID={testID}
                value={value}
            />
        </NativeHost>
    );
}
