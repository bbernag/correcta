import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";
export {PlaygroundFoundationSection} from "./PlaygroundFoundationSection";

export const PlaygroundSection = {
    Body: PlaygroundSectionBody,
    Header: PlaygroundSectionHeader,
    Root: PlaygroundSectionRoot,
} as const;
