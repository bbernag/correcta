import {DateTimePicker as ExpoDateTimePicker} from "@expo/ui/community/datetime-picker";
import {useUnistyles} from "react-native-unistyles";

import type {NativeDateTimePickerProps} from "./nativeDateTimePickerTypes";

export function NativeDateTimePicker({
    accentColor,
    ...pickerProps
}: NativeDateTimePickerProps) {
    const {theme} = useUnistyles();

    return (
        <ExpoDateTimePicker
            accentColor={accentColor ?? theme.colors.accentPrimary}
            {...pickerProps}
        />
    );
}
