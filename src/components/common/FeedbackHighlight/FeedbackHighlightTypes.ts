import type {PropsWithChildren} from "react";
import type {StyleProp, ViewStyle} from "react-native";

import type {NoticeCardTone} from "../NoticeCard";

export type FeedbackHighlightProps = PropsWithChildren<{
    message?: string;
    style?: StyleProp<ViewStyle>;
    title: string;
    tone: NoticeCardTone;
}>;
