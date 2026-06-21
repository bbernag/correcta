import {
    SegmentedControl,
    type SegmentedControlOption,
} from "../../../components/common";
import {LIBRARY_SEGMENTS} from "../constants/libraryConstants";
import type {LibraryRecords, LibrarySegment} from "../types/libraryTypes";

type LibrarySegmentControlProps = {
    onChange: (segment: LibrarySegment) => void;
    records: LibraryRecords;
    value: LibrarySegment;
};

export function LibrarySegmentControl({
    onChange,
    records,
    value,
}: LibrarySegmentControlProps) {
    function handleChange(nextValue: string) {
        if (isLibrarySegment(nextValue)) {
            onChange(nextValue);
        }
    }

    return (
        <SegmentedControl
            accessibilityLabel="Library sections"
            onChange={handleChange}
            options={getLibrarySegmentOptions(records)}
            value={value}
        />
    );
}

function getLibrarySegmentOptions(
    records: LibraryRecords
): SegmentedControlOption[] {
    return [
        {
            accessibilityHint: "Shows saved words.",
            accessibilityLabel: "Saved words library segment",
            icon: "word",
            label: getSegmentLabel({
                count: records.savedWords.length,
                label: "Words",
            }),
            value: "words",
        },
        {
            accessibilityHint: "Shows saved sentences.",
            accessibilityLabel: "Saved sentences library segment",
            icon: "sentence",
            label: getSegmentLabel({
                count: records.savedSentences.length,
                label: "Sentences",
            }),
            value: "sentences",
        },
        {
            accessibilityHint: "Shows practice history.",
            accessibilityLabel: "Practice history library segment",
            icon: "time",
            label: getSegmentLabel({
                count: records.attempts.length,
                label: "History",
            }),
            value: "history",
        },
    ];
}

function getSegmentLabel({count, label}: {count: number; label: string}) {
    return count > 0 ? `${label} ${count}` : label;
}

function isLibrarySegment(value: string): value is LibrarySegment {
    return LIBRARY_SEGMENTS.some((segment) => {
        return segment === value;
    });
}
