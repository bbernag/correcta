import type {SwitchProps} from "@expo/ui";
import type {StyleProp, ViewStyle} from "react-native";

type NativeSwitchAccessibleLabel =
    | {
          accessibilityLabel: string;
          label?: string;
      }
    | {
          accessibilityLabel?: string;
          label: string;
      };

export type NativeSwitchProps = Omit<SwitchProps, "label" | "modifiers"> &
    NativeSwitchAccessibleLabel & {
        style?: StyleProp<ViewStyle>;
    };
