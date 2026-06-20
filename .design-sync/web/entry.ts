// Web bundle entry for design-sync. Importing the theme module first runs
// `StyleSheet.configure(...)` (react-native-unistyles) so every component below
// resolves its themed styles at module-eval time. Then we re-export the scoped
// subset of the `src/components/common` design system for the web bundle.
//
// Screen is intentionally excluded — it is a native screen scaffold
// (keyboard-controller + bottom-tabs) with no meaningful web rendering.
import "../../src/theme/unistyles";

export {AppText} from "../../src/components/common/AppText";
export {Button} from "../../src/components/common/Button";
export {Card} from "../../src/components/common/Card";
export {GlassSurface} from "../../src/components/common/GlassSurface";
export {Icon} from "../../src/components/common/Icon";
export {IconButton} from "../../src/components/common/IconButton";
export {NoticeCard} from "../../src/components/common/NoticeCard";
export {PocCard} from "../../src/components/common/PocCard";
export {Surface} from "../../src/components/common/Surface";
export {TextInput} from "../../src/components/common/TextInput";
