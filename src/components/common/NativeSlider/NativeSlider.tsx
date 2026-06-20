import {Slider as ExpoSlider} from "@expo/ui";

import {NativeHost} from "../NativeHost";
import type {NativeSliderProps} from "./NativeSliderTypes";

export function NativeSlider({
    accessibilityLabel,
    disabled,
    max,
    min,
    onValueChange,
    step,
    style,
    testID,
    value,
}: NativeSliderProps) {
    return (
        <NativeHost
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="adjustable"
            accessibilityState={{disabled}}
            matchContents
            style={style}
        >
            <ExpoSlider
                disabled={disabled}
                max={max}
                min={min}
                onValueChange={onValueChange}
                step={step}
                testID={testID}
                value={value}
            />
        </NativeHost>
    );
}
