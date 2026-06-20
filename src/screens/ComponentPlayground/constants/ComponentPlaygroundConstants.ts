import type {
    ComponentPlaygroundButtonExample,
    ComponentPlaygroundGlassExample,
    ComponentPlaygroundHapticAction,
    ComponentPlaygroundIconButtonExample,
    ComponentPlaygroundIconSample,
    ComponentPlaygroundInputExample,
    ComponentPlaygroundNoticeExample,
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
            body: "Default card surface with a subtle boundary.",
            title: "Card",
            variant: "card",
        },
        {
            body: "Elevated treatment for important grouped content.",
            title: "Elevated",
            variant: "elevated",
        },
        {
            body: "Tonal surface for quiet, grouped panels.",
            title: "Muted",
            variant: "muted",
        },
        {
            body: "Outline surface for low-emphasis sections.",
            title: "Outline",
            variant: "outline",
        },
    ];

export const COMPONENT_PLAYGROUND_NOTICE_EXAMPLES: ComponentPlaygroundNoticeExample[] =
    [
        {
            body: "Correct feedback uses success only for a learning result.",
            title: "Correct",
            tone: "success",
        },
        {
            body: "Needs-work feedback stays clear without feeling punitive.",
            title: "Needs work",
            tone: "warning",
        },
        {
            body: "Error notes explain what failed and the next step.",
            title: "Something went wrong",
            tone: "danger",
        },
        {
            body: "Teacher notes and hints use a neutral information tone.",
            title: "Teacher note",
            tone: "info",
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

export const COMPONENT_PLAYGROUND_CARD_PROGRESS_SEGMENTS = Array.from(
    {length: 18},
    (_, index) => index
);
