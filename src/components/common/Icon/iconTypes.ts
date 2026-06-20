import type {LucideProps} from "lucide-react-native";

import type {IconName} from "./iconRegistry";

export type IconSize = "dense" | "default" | "tab" | "hero" | "empty";

export type IconTone =
    | "primary"
    | "secondary"
    | "muted"
    | "accent"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "inverted";

export type IconProps = Omit<
    LucideProps,
    "color" | "size" | "strokeLinecap" | "strokeLinejoin" | "strokeWidth"
> & {
    color?: string;
    name: IconName;
    size?: IconSize;
    tone?: IconTone;
};
