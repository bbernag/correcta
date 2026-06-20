import type {PropsWithChildren} from "react";
import type {ColorValue, StyleProp, ViewProps, ViewStyle} from "react-native";

import type {IconName} from "../Icon";

export type NoticeCardTone = "success" | "warning" | "danger" | "info";

/**
 * Linked feedback note: a status heading joined to its detail.
 *
 * When the note is revealed after an action (e.g. checking an answer), pass
 * `accessibilityLiveRegion="polite"` so screen readers announce it.
 */
export type NoticeCardProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        /**
         * Color painted into the linked-card notch cutouts. Defaults to the
         * canvas color; set it to the parent background when the note sits on a
         * non-canvas surface so the notches stay seamless.
         */
        cutoutColor?: ColorValue;
        icon?: IconName;
        style?: StyleProp<ViewStyle>;
        title: string;
        tone: NoticeCardTone;
    }
>;
