import type {CollapsibleProps} from "@expo/ui";
import type {ReactElement} from "react";
import type {StyleProp, ViewStyle} from "react-native";

type NativeCollapsibleAccessibleLabel =
    | {
          accessibilityLabel: string;
          label?: string;
      }
    | {
          accessibilityLabel?: string;
          label: string;
      };

export type NativeCollapsibleProps = Omit<
    CollapsibleProps,
    "children" | "label"
> &
    NativeCollapsibleAccessibleLabel & {
        children?: ReactElement;
        style?: StyleProp<ViewStyle>;
    };
