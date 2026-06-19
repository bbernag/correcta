import type {
    ComponentPlaygroundButtonExample,
    ComponentPlaygroundGlassExample,
    ComponentPlaygroundHapticAction,
    ComponentPlaygroundIconButtonExample,
    ComponentPlaygroundIconSample,
    ComponentPlaygroundInputExample,
    ComponentPlaygroundSurfaceExample,
    ComponentPlaygroundTextExample,
} from "../types/ComponentPlaygroundTypes";

export const COMPONENT_PLAYGROUND_TEXT_EXAMPLES: ComponentPlaygroundTextExample[] =
    [
        {
            label: "Display",
            text: "Daily practice",
            variant: "display",
        },
        {
            label: "Sentence",
            text: "The learner corrected the sentence carefully.",
            variant: "sentence",
        },
        {
            label: "Answer",
            text: "I have been studying since morning.",
            tone: "secondary",
            variant: "answer",
        },
        {
            label: "Metric",
            text: "84%",
            tone: "accent",
            variant: "metric",
        },
    ];

export const COMPONENT_PLAYGROUND_BUTTON_EXAMPLES: ComponentPlaygroundButtonExample[] =
    [
        {
            accessibilityLabel: "Start practice button example",
            label: "Start practice",
            leadingIcon: "practice",
            variant: "primary",
        },
        {
            accessibilityLabel: "Save sentence button example",
            label: "Save sentence",
            leadingIcon: "save",
            variant: "secondary",
        },
        {
            accessibilityLabel: "Show hint button example",
            label: "Show hint",
            size: "small",
            trailingIcon: "hint",
            variant: "tertiary",
        },
        {
            accessibilityLabel: "Remove item button example",
            label: "Remove",
            leadingIcon: "error",
            variant: "danger",
        },
        {
            accessibilityLabel: "Correct answer button example",
            label: "Correct",
            leadingIcon: "success",
            variant: "success",
        },
        {
            accessibilityLabel: "Checking answer button example",
            label: "Check answer",
            loading: true,
            variant: "primary",
        },
    ];

export const COMPONENT_PLAYGROUND_SURFACE_EXAMPLES: ComponentPlaygroundSurfaceExample[] =
    [
        {
            body: "Default card surface with subtle boundary.",
            title: "Card",
            variant: "card",
        },
        {
            body: "Elevated treatment for important grouped content.",
            rail: "accent",
            title: "Elevated",
            variant: "elevated",
        },
        {
            body: "Correct feedback uses success only for learning result.",
            title: "Success",
            variant: "success",
        },
        {
            body: "Needs-work feedback stays clear without feeling punitive.",
            title: "Warning",
            variant: "warning",
        },
        {
            body: "Error surfaces explain app-level failures.",
            title: "Danger",
            variant: "danger",
        },
        {
            body: "Teacher notes and hints use neutral information treatment.",
            title: "Info",
            variant: "info",
        },
    ];

export const COMPONENT_PLAYGROUND_INPUT_EXAMPLES: ComponentPlaygroundInputExample[] =
    [
        {
            helperText: "Helper text stays close to the field.",
            label: "Default input",
            leadingIcon: "sentence",
            placeholder: "Write a translation",
        },
        {
            label: "Success input",
            leadingIcon: "success",
            status: "success",
            successText: "This answer is ready to save.",
            value: "I have been practicing.",
        },
        {
            error: "Add an answer before checking.",
            label: "Error input",
            leadingIcon: "warning",
            placeholder: "Empty answer",
        },
        {
            disabled: true,
            helperText: "Disabled fields remain readable.",
            label: "Disabled input",
            trailingIcon: "lock",
            value: "Locked after submission",
        },
    ];

export const COMPONENT_PLAYGROUND_ICON_SAMPLES: ComponentPlaygroundIconSample[] =
    [
        {label: "Practice", name: "practice", tone: "accent"},
        {label: "Review", name: "review", tone: "secondary"},
        {label: "Saved", name: "saved", tone: "success"},
        {label: "Needs work", name: "warning", tone: "warning"},
        {label: "Goal", name: "goal", tone: "accent"},
        {label: "Accuracy", name: "accuracy", tone: "info"},
    ];

export const COMPONENT_PLAYGROUND_ICON_BUTTON_EXAMPLES: ComponentPlaygroundIconButtonExample[] =
    [
        {
            accessibilityLabel: "Open settings example",
            icon: "settings",
            label: "Surface",
            variant: "surface",
        },
        {
            accessibilityLabel: "Show hint example",
            icon: "hint",
            label: "Tonal",
            variant: "tonal",
        },
        {
            accessibilityLabel: "Saved example selected",
            icon: "saved",
            label: "Selected",
            selected: true,
            variant: "tonal",
        },
        {
            accessibilityLabel: "Close example large",
            icon: "close",
            label: "Large",
            size: "large",
            variant: "ghost",
        },
        {
            accessibilityLabel: "Delete example",
            icon: "error",
            label: "Danger",
            variant: "danger",
        },
    ];

export const COMPONENT_PLAYGROUND_HAPTIC_ACTIONS: ComponentPlaygroundHapticAction[] =
    [
        {
            accessibilityLabel: "Play selection haptic example",
            feedback: "selection",
            icon: "check",
            label: "Selection",
            variant: "surface",
        },
        {
            accessibilityLabel: "Play success haptic example",
            feedback: "success",
            icon: "success",
            label: "Success",
            variant: "tonal",
        },
        {
            accessibilityLabel: "Play warning haptic example",
            feedback: "warning",
            icon: "warning",
            label: "Warning",
            variant: "surface",
        },
        {
            accessibilityLabel: "Play error haptic example",
            feedback: "error",
            icon: "error",
            label: "Error",
            variant: "danger",
        },
    ];

export const COMPONENT_PLAYGROUND_GLASS_EXAMPLES: ComponentPlaygroundGlassExample[] =
    [
        {
            icon: "settings",
            label: "Header",
            variant: "headerControl",
        },
        {
            icon: "hint",
            label: "Floating",
            variant: "floatingControl",
        },
        {
            icon: "review",
            label: "Menu",
            variant: "menu",
        },
        {
            icon: "check",
            label: "Chip",
            variant: "chip",
        },
    ];

export const COMPONENT_PLAYGROUND_CARD_UNION_BRIDGE_SPANS = [
    0.66, 0.7, 0.78,
] as const;

export const COMPONENT_PLAYGROUND_CARD_UNION_PROGRESS_SEGMENTS = Array.from(
    {length: 18},
    (_, index) => index
);
