import type {
    DateTimePickerChangeEvent,
    DateTimePickerProps,
} from "@expo/ui/community/datetime-picker";

export type NativeDateTimePickerChangeEvent = DateTimePickerChangeEvent;

export type NativeDateTimePickerProps = Omit<DateTimePickerProps, "onChange">;
