import type {
    IconButtonSize,
    IconButtonVariant,
    IconName,
    IconTone,
} from "../../../components/common";
import type {HapticFeedback} from "../../../native";

export type ComponentPlaygroundIconSample = {
    label: string;
    name: IconName;
    tone: IconTone;
};

export type ComponentPlaygroundIconButtonExample = {
    accessibilityLabel: string;
    icon: IconName;
    label: string;
    selected?: boolean;
    size?: IconButtonSize;
    variant: IconButtonVariant;
};

export type ComponentPlaygroundHapticAction = {
    accessibilityLabel: string;
    feedback: HapticFeedback;
    icon: IconName;
    label: string;
    variant: IconButtonVariant;
};
