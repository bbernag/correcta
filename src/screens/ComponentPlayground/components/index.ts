import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";
export {PlaygroundCardSection} from "./PlaygroundCardSection";
export {PlaygroundFoundationSection} from "./PlaygroundFoundationSection";
export {PlaygroundScaffoldSection} from "./PlaygroundScaffoldSection";

export const PlaygroundSection = {
    Body: PlaygroundSectionBody,
    Header: PlaygroundSectionHeader,
    Root: PlaygroundSectionRoot,
} as const;
