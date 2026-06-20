import {Chip, type ChipVariant} from "../Chip";
import type {IconName} from "../Icon";
import type {ResultBadgeProps, ResultBadgeTone} from "./resultBadgeTypes";

export function ResultBadge({label, style, tone}: ResultBadgeProps) {
    return (
        <Chip
            icon={getResultBadgeIcon(tone)}
            label={label}
            style={style}
            variant={getResultBadgeVariant(tone)}
        />
    );
}

function getResultBadgeVariant(tone: ResultBadgeTone): ChipVariant {
    switch (tone) {
        case "correct":
            return "success";
        case "almost":
        case "skipped":
            return "warning";
        case "incorrect":
            return "danger";
        case "info":
        default:
            return "info";
    }
}

function getResultBadgeIcon(tone: ResultBadgeTone): IconName {
    switch (tone) {
        case "correct":
            return "success";
        case "incorrect":
            return "error";
        case "almost":
        case "skipped":
            return "warning";
        case "info":
        default:
            return "info";
    }
}
