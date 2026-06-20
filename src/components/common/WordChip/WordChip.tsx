import {Chip, type ChipVariant} from "../Chip";
import type {WordChipProps, WordChipStatus} from "./WordChipTypes";

export function WordChip({
    disabled = false,
    label,
    onPress,
    status = "default",
    style,
}: WordChipProps) {
    return (
        <Chip
            accessibilityLabel={label}
            disabled={disabled}
            icon={getWordChipIcon(status)}
            label={label}
            onPress={onPress}
            selected={status === "selected"}
            style={style}
            variant={getWordChipVariant(status)}
        />
    );
}

function getWordChipVariant(status: WordChipStatus): ChipVariant {
    switch (status) {
        case "correct":
            return "success";
        case "incorrect":
            return "danger";
        case "selected":
            return "accent";
        case "default":
        default:
            return "neutral";
    }
}

function getWordChipIcon(status: WordChipStatus) {
    switch (status) {
        case "correct":
            return "success";
        case "incorrect":
            return "warning";
        case "default":
        case "selected":
        default:
            return undefined;
    }
}
