import type {
    ComponentPlaygroundHapticAction,
    ComponentPlaygroundIconButtonExample,
    ComponentPlaygroundIconSample,
} from "../types/ComponentPlaygroundTypes";

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
