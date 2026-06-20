import type {StyleProp, ViewStyle} from "react-native";

export type ErrorStateProps = {
    message: string;
    onRetry?: () => void;
    retryLabel?: string;
    style?: StyleProp<ViewStyle>;
    title?: string;
};
