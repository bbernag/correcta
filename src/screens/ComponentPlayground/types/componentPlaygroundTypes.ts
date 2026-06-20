import type {
    AppTextTone,
    AppTextVariant,
    ButtonSize,
    ButtonVariant,
    ChipVariant,
    GlassSurfaceVariant,
    IconButtonSize,
    IconButtonVariant,
    IconName,
    IconTone,
    NoticeCardTone,
    ProgressBarTone,
    ResultBadgeTone,
    StatCardTone,
    SquircleSurfaceRadius,
    SurfaceVariant,
    TextInputStatus,
    WordChipStatus,
} from "../../../components/common";
import type {HapticFeedback} from "../../../native";
import type {PropsWithChildren, ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";

export type ComponentPlaygroundSectionRootProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
}>;

export type ComponentPlaygroundSectionHeaderProps = {
    action?: ReactNode;
    description?: string;
    eyebrow?: string;
    title: string;
};

export type ComponentPlaygroundSectionBodyProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
}>;

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
    title: string;
    variant: SurfaceVariant;
};

export type ComponentPlaygroundNoticeExample = {
    body: string;
    title: string;
    tone: NoticeCardTone;
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

export type ComponentPlaygroundGlassExample = {
    icon: IconName;
    label: string;
    variant: GlassSurfaceVariant;
};

export type ComponentPlaygroundSquircleExample = {
    label: string;
    radius: SquircleSurfaceRadius;
};

export type ComponentPlaygroundChipExample = {
    disabled?: boolean;
    icon?: IconName;
    label: string;
    selected?: boolean;
    variant: ChipVariant;
};

export type ComponentPlaygroundWordChipExample = {
    disabled?: boolean;
    label: string;
    status: WordChipStatus;
};

export type ComponentPlaygroundProgressExample = {
    accessibilityLabel: string;
    label: string;
    max: number;
    tone: ProgressBarTone;
    value: number;
};

export type ComponentPlaygroundStatExample = {
    helper: string;
    icon: IconName;
    label: string;
    tone: StatCardTone;
    value: string;
};

export type ComponentPlaygroundResultBadgeExample = {
    label: string;
    tone: ResultBadgeTone;
};
