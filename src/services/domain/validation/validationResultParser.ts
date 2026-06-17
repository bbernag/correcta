import type {ValidationResult, ValidationStatus} from "../../../types";

const VALIDATION_STATUSES = [
    "correct",
    "almostCorrect",
    "partial",
    "incorrect",
    "skipped",
] as const satisfies ValidationStatus[];

export function parseValidationResult(value: unknown) {
    if (!isRecord(value)) {
        return null;
    }

    if (
        typeof value.id !== "string" ||
        typeof value.sentenceId !== "string" ||
        !isValidationStatus(value.status) ||
        typeof value.score !== "number" ||
        value.score < 0 ||
        value.score > 1 ||
        typeof value.mode !== "string" ||
        typeof value.userAnswer !== "string" ||
        typeof value.preferredAnswer !== "string" ||
        !Array.isArray(value.acceptedTranslations) ||
        !Array.isArray(value.mistakes) ||
        typeof value.canRetry !== "boolean" ||
        typeof value.checkedAt !== "string"
    ) {
        return null;
    }

    return value as ValidationResult;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isValidationStatus(value: unknown): value is ValidationStatus {
    return (
        typeof value === "string" &&
        VALIDATION_STATUSES.includes(value as ValidationStatus)
    );
}
