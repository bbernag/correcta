import type {
    ExpoUiCatalogItem,
    ExpoUiCatalogSection,
} from "../types/ExpoUiShowcaseTypes";

const universalTone = "accent";
const swiftTone = "info";
const androidTone = "success";
const dropInTone = "secondary";

const universalItems = [
    ["Host", "Required native host wrapper for Expo UI trees."],
    ["Column", "Vertical layout container with native spacing."],
    ["Row", "Horizontal layout container for grouped controls."],
    ["Text", "Native text rendering with shared text style props."],
    ["Button", "Pressable action with filled, outlined, and text variants."],
    ["Switch", "Platform-native toggle with an optional label."],
    ["Checkbox", "Controlled checked state for compact settings rows."],
    ["Slider", "Continuous or stepped numeric value control."],
    ["TextInput", "Native text field with React Native-compatible props."],
    ["Picker", "Menu or wheel selection control for one value."],
    ["Icon", "SF Symbols on iOS and vector XML on Android."],
    [
        "Collapsible",
        "Expandable content section with a tappable native header.",
    ],
    ["BottomSheet", "Modal sheet that presents content from the bottom edge."],
    ["FieldGroup", "Scrollable grouped settings-style sections."],
    ["List", "Virtualized native vertical rows paired with ListItem."],
    ["ListItem", "Tappable row primitive for native lists."],
    ["RNHostView", "Embeds React Native views inside an Expo UI tree."],
    ["ScrollView", "Universal vertical or horizontal scroll container."],
    ["Spacer", "Fixed or flexible empty space inside rows and columns."],
] as const;

const dropInItems = [
    ["BottomSheet", "Compatible replacement for @gorhom/bottom-sheet."],
    [
        "DateTimePicker",
        "Replacement for @react-native-community/datetimepicker.",
    ],
    ["MaskedView", "Replacement for @react-native-masked-view/masked-view."],
    ["Menu", "Replacement compatible with @react-native-menu/menu."],
    ["PagerView", "Replacement compatible with react-native-pager-view."],
    ["Picker", "Replacement compatible with @react-native-picker/picker."],
    [
        "SegmentedControl",
        "Replacement for @react-native-segmented-control/segmented-control.",
    ],
    ["Slider", "Replacement compatible with @react-native-community/slider."],
] as const;

const swiftUiItems = [
    ["AccessoryWidgetBackground", "Adaptive widget background treatment."],
    ["Alert", "Native alert presentation."],
    ["BottomSheet", "Native bottom sheet presentation."],
    ["Button", "SwiftUI button action."],
    ["Chart", "Swift Charts wrapper for native chart marks."],
    ["ColorPicker", "Native color selection control."],
    ["ConfirmationDialog", "Confirmation prompt with native options."],
    ["ContentUnavailableView", "Empty state view with native anatomy."],
    ["ContextMenu", "Long-press or secondary-click context actions."],
    ["ControlGroup", "Grouped controls with platform styling."],
    ["DatePicker", "Calendar and time selection."],
    ["DisclosureGroup", "Expandable content group."],
    ["Divider", "Native separator line."],
    ["Form", "Structured native form layout."],
    ["Gauge", "Progress and value gauge."],
    ["GlassEffectContainer", "Liquid glass grouping container."],
    ["Grid", "Native grid layout."],
    ["Group", "Logical view grouping without layout effect."],
    ["HStack", "Horizontal SwiftUI stack."],
    ["Host", "Required wrapper for SwiftUI trees."],
    ["Image", "SF Symbol image view."],
    ["Label", "Text paired with an image."],
    ["LabeledContent", "Label-value row content."],
    ["LazyHStack", "Lazy horizontal stack."],
    ["LazyVStack", "Lazy vertical stack."],
    ["Link", "Native external link control."],
    ["List", "Native scrollable list."],
    ["Mask", "Mask composition utilities."],
    ["Menu", "Native menu control."],
    ["Namespace", "Namespace for matched identifiers."],
    ["Overlay", "Layer content over another view."],
    ["Picker", "Native selection picker."],
    ["Popover", "Floating popover content."],
    ["ProgressView", "Indeterminate or determinate progress."],
    ["RNHostView", "Embed React Native content inside SwiftUI."],
    ["ScrollView", "SwiftUI scroll container."],
    ["Section", "List or form section."],
    ["SecureField", "Secure text entry."],
    ["ShareLink", "Native share action link."],
    ["Shapes", "Rectangle, capsule, circle, and related SwiftUI shapes."],
    ["Slider", "Continuous value selector."],
    ["Spacer", "Flexible or fixed layout space."],
    ["Stepper", "Increment and decrement numeric input."],
    ["SwipeActions", "Leading and trailing row swipe actions."],
    ["SyncToggle", "Synchronous native-backed toggle."],
    ["TabView", "Paged or tabbed native view."],
    ["Text", "SwiftUI text view."],
    ["TextField", "SwiftUI text field."],
    ["Toggle", "Boolean toggle control."],
    ["VStack", "Vertical SwiftUI stack."],
    ["ZStack", "Overlapping SwiftUI stack."],
] as const;

const jetpackItems = [
    ["AlertDialog", "Material alert dialog."],
    ["AnimatedVisibility", "Animated show and hide wrapper."],
    ["Badge", "Small status or count indicator."],
    ["BadgedBox", "Badge overlaid on another component."],
    ["BasicAlertDialog", "Custom-content alert dialog."],
    ["Box", "Stacking layout container."],
    ["Button", "Material button family."],
    ["Card", "Material content card."],
    ["Carousel", "Scrollable carousel collection."],
    ["Checkbox", "Selection checkbox."],
    ["Chip", "Assist, filter, input, and suggestion chips."],
    ["Column", "Vertical Compose layout."],
    ["DatePicker", "Material date picker."],
    ["Divider", "Material divider line."],
    ["DockedSearchBar", "Inline Material search input."],
    ["DropdownMenu", "Dropdown action menu."],
    ["ExposedDropdownMenuBox", "Text-field anchored dropdown menu."],
    ["FloatingActionButton", "High-emphasis floating action button family."],
    ["FlowRow", "Wrapping horizontal row layout."],
    ["HorizontalFloatingToolbar", "Floating toolbar with horizontal actions."],
    ["HorizontalPager", "Swipeable horizontal pages."],
    ["Host", "Required wrapper for Compose trees."],
    ["Icon", "Vector drawable icon."],
    ["IconButton", "Material icon button family."],
    ["LazyColumn", "Virtualized vertical list."],
    ["LazyRow", "Virtualized horizontal list."],
    ["ListItem", "Material structured row."],
    ["LoadingIndicator", "Material loading spinner."],
    ["ModalBottomSheet", "Material modal bottom sheet."],
    ["NavigationBar", "Material bottom navigation."],
    ["Progress", "Linear, circular, and wavy progress indicators."],
    ["PullToRefreshBox", "Pull-to-refresh container."],
    ["RadioButton", "Single-choice radio control."],
    ["RNHostView", "Embed React Native content inside Compose."],
    ["Row", "Horizontal Compose layout."],
    ["SearchBar", "Full Material search bar."],
    ["SegmentedButton", "Single and multi-choice segmented buttons."],
    ["Shape", "Geometric shape records for Compose surfaces."],
    ["Slider", "Material value slider."],
    ["Snackbar", "Brief bottom feedback message."],
    ["Spacer", "Flexible or fixed layout space."],
    ["Surface", "Material surface container."],
    ["Switch", "Material switch."],
    ["SyncSwitch", "Synchronous native-backed switch."],
    ["Text", "Compose text view."],
    ["TextField", "Filled, outlined, and basic text fields."],
    ["ToggleButton", "Material toggle button family."],
    ["Tooltip", "Long-press contextual hint."],
] as const;

export const EXPO_UI_CATALOG_SECTIONS: ExpoUiCatalogSection[] = [
    {
        description:
            "Single API components that delegate to SwiftUI on iOS and Jetpack Compose on Android.",
        eyebrow: "Universal",
        items: createCatalogItems(universalItems, "Live", universalTone),
        title: "Cross-platform components",
    },
    {
        description:
            "API-compatible replacements exposed from @expo/ui/community entry points.",
        eyebrow: "Drop-ins",
        items: createCatalogItems(dropInItems, "Catalog", dropInTone),
        title: "Community replacements",
    },
    {
        description:
            "iOS and tvOS SwiftUI components exported from @expo/ui/swift-ui.",
        eyebrow: "SwiftUI",
        items: createCatalogItems(swiftUiItems, "iOS", swiftTone),
        title: "Apple-native surface",
    },
    {
        description:
            "Android Material 3 and Jetpack Compose components exported from @expo/ui/jetpack-compose.",
        eyebrow: "Jetpack Compose",
        items: createCatalogItems(jetpackItems, "Android", androidTone),
        title: "Android-native surface",
    },
];

function createCatalogItems(
    items: readonly (readonly [string, string])[],
    status: string,
    tone: ExpoUiCatalogItem["tone"]
): ExpoUiCatalogItem[] {
    return items.map(([name, description]) => ({
        description,
        name,
        status,
        tone,
    }));
}
