import {
    BottomSheet as ExpoBottomSheet,
    BottomSheetFlatList as ExpoBottomSheetFlatList,
    BottomSheetScrollView as ExpoBottomSheetScrollView,
    BottomSheetSectionList as ExpoBottomSheetSectionList,
    BottomSheetTextInput as ExpoBottomSheetTextInput,
    BottomSheetView as ExpoBottomSheetView,
} from "@expo/ui/community/bottom-sheet";

import type {NativeBottomSheetProps} from "./nativeBottomSheetTypes";

function NativeBottomSheetRoot({
    children,
    contentStyle,
    enablePanDownToClose = true,
    isPresented,
    onDismiss,
    ...sheetProps
}: NativeBottomSheetProps) {
    return (
        <ExpoBottomSheet
            enablePanDownToClose={enablePanDownToClose}
            index={isPresented ? 0 : -1}
            onClose={onDismiss}
            {...sheetProps}
        >
            <ExpoBottomSheetView style={contentStyle}>
                {children}
            </ExpoBottomSheetView>
        </ExpoBottomSheet>
    );
}

export const NativeBottomSheet = Object.assign(NativeBottomSheetRoot, {
    FlatList: ExpoBottomSheetFlatList,
    ScrollView: ExpoBottomSheetScrollView,
    SectionList: ExpoBottomSheetSectionList,
    TextInput: ExpoBottomSheetTextInput,
    View: ExpoBottomSheetView,
});
