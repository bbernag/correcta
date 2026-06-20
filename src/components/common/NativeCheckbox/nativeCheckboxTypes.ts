import type {CheckboxProps} from "@expo/ui";
import type {StyleProp, ViewStyle} from "react-native";

type NativeCheckboxAccessibleLabel =
    | {
          accessibilityLabel: string;
          label?: string;
      }
    | {
          accessibilityLabel?: string;
          label: string;
      };

export type NativeCheckboxProps = Omit<CheckboxProps, "label" | "modifiers"> &
    NativeCheckboxAccessibleLabel & {
        style?: StyleProp<ViewStyle>;
    };
