import {
    SegmentedControl,
    type SegmentedControlOption,
} from "../../../components/common";
import {LIBRARY_SEGMENTS} from "../constants/libraryConstants";
import type {LibrarySegment} from "../types/libraryTypes";

const LIBRARY_SEGMENT_OPTIONS: SegmentedControlOption[] = [
    {
        accessibilityLabel: "Saved words library segment",
        icon: "word",
        label: "Words",
        value: "words",
    },
    {
        accessibilityLabel: "Saved sentences library segment",
        icon: "sentence",
        label: "Sentences",
        value: "sentences",
    },
    {
        accessibilityLabel: "Practice history library segment",
        icon: "time",
        label: "History",
        value: "history",
    },
];

type LibrarySegmentControlProps = {
    onChange: (segment: LibrarySegment) => void;
    value: LibrarySegment;
};

export function LibrarySegmentControl({
    onChange,
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
            options={LIBRARY_SEGMENT_OPTIONS}
            value={value}
        />
    );
}

function isLibrarySegment(value: string): value is LibrarySegment {
    return LIBRARY_SEGMENTS.some((segment) => {
        return segment === value;
    });
}
