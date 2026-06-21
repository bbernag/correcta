import type {StyleProp, ViewStyle} from "react-native";

export type WordChipStatus = "default" | "selected" | "correct" | "incorrect";

export type WordChipProps = {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    disabled?: boolean;
    label: string;
    onPress?: () => void;
    status?: WordChipStatus;
    style?: StyleProp<ViewStyle>;
};
