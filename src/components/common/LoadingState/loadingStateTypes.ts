import type {StyleProp, ViewStyle} from "react-native";

export type LoadingStateProps = {
    message?: string;
    style?: StyleProp<ViewStyle>;
    title: string;
};
