import {useCallback, useMemo, useState} from "react";

import type {ExpoUiShowcaseState} from "../types/ExpoUiShowcaseTypes";

export function useExpoUiShowcase(): ExpoUiShowcaseState {
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(true);
    const [collapsibleOpen, setCollapsibleOpen] = useState(true);
    const [pickerValue, setPickerValue] = useState("balanced");
    const [sliderValue, setSliderValue] = useState(35);
    const [switchValue, setSwitchValue] = useState(true);
    const [textValue, setTextValue] = useState("I have practiced twice today.");

    const handleBottomSheetOpen = useCallback(() => {
        setBottomSheetVisible(true);
    }, []);

    const handleBottomSheetDismiss = useCallback(() => {
        setBottomSheetVisible(false);
    }, []);

    return useMemo(
        () => ({
            bottomSheetVisible,
            checkboxValue,
            collapsibleOpen,
            pickerValue,
            sliderValue,
            switchValue,
            textValue,
            onBottomSheetDismiss: handleBottomSheetDismiss,
            onBottomSheetOpen: handleBottomSheetOpen,
            onCheckboxValueChange: setCheckboxValue,
            onCollapsibleOpenChange: setCollapsibleOpen,
            onPickerValueChange: setPickerValue,
            onSliderValueChange: setSliderValue,
            onSwitchValueChange: setSwitchValue,
            onTextValueChange: setTextValue,
        }),
        [
            bottomSheetVisible,
            checkboxValue,
            collapsibleOpen,
            handleBottomSheetDismiss,
            handleBottomSheetOpen,
            pickerValue,
            sliderValue,
            switchValue,
            textValue,
        ]
    );
}
