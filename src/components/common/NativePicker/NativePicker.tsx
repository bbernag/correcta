import {Picker as ExpoPicker} from "@expo/ui";

import {NativeHost} from "../NativeHost";
import type {
    NativePickerItemProps,
    NativePickerItemValue,
    NativePickerProps,
} from "./NativePickerTypes";

function NativePickerRoot<T extends NativePickerItemValue>({
    accessibilityLabel,
    appearance,
    children,
    enabled,
    onValueChange,
    selectedValue,
    style,
    testID,
}: NativePickerProps<T>) {
    return (
        <NativeHost
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{disabled: enabled === false}}
            matchContents
            style={style}
        >
            <ExpoPicker
                appearance={appearance}
                enabled={enabled}
                onValueChange={onValueChange}
                selectedValue={selectedValue}
                testID={testID}
            >
                {children}
            </ExpoPicker>
        </NativeHost>
    );
}

function NativePickerItem<T extends NativePickerItemValue>({
    label,
    value,
}: NativePickerItemProps<T>) {
    return <ExpoPicker.Item label={label} value={value} />;
}

export const NativePicker = Object.assign(NativePickerRoot, {
    Item: NativePickerItem,
});
