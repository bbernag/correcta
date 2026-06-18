import type {
    AppTextTone,
    AppTextVariant,
    ButtonSize,
    ButtonVariant,
    IconButtonSize,
    IconButtonVariant,
    IconName,
    IconTone,
    SurfaceRail,
    SurfaceVariant,
    TextInputStatus,
} from "../../../components/common";
import type {HapticFeedback} from "../../../native";

export type ComponentPlaygroundTextExample = {
    label: string;
    text: string;
    tone?: AppTextTone;
    variant: AppTextVariant;
};

export type ComponentPlaygroundButtonExample = {
    accessibilityLabel: string;
    label: string;
    leadingIcon?: IconName;
    loading?: boolean;
    size?: ButtonSize;
    trailingIcon?: IconName;
    variant: ButtonVariant;
};

export type ComponentPlaygroundSurfaceExample = {
    body: string;
    rail?: SurfaceRail;
    title: string;
    variant: SurfaceVariant;
};

export type ComponentPlaygroundInputExample = {
    disabled?: boolean;
    error?: string;
    helperText?: string;
    label: string;
    leadingIcon?: IconName;
    placeholder?: string;
    status?: TextInputStatus;
    successText?: string;
    trailingIcon?: IconName;
    value?: string;
};

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
