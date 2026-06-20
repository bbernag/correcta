import type {PropsWithChildren} from "react";
import type {StyleProp, ViewStyle} from "react-native";

import type {AppTextTone} from "../../../components/common";

export type ExpoUiCatalogItem = {
    description: string;
    name: string;
    status: string;
    tone?: AppTextTone;
};

export type ExpoUiCatalogSection = {
    description: string;
    eyebrow: string;
    items: ExpoUiCatalogItem[];
    title: string;
};

export type ExpoUiCatalogItemProps = {
    item: ExpoUiCatalogItem;
};

export type ExpoUiCatalogSectionProps = {
    section: ExpoUiCatalogSection;
};

export type ExpoUiLivePreviewProps = {
    bottomSheetVisible: boolean;
    checkboxValue: boolean;
    collapsibleOpen: boolean;
    pickerValue: string;
    sliderValue: number;
    switchValue: boolean;
    textValue: string;
    onBottomSheetDismiss: () => void;
    onBottomSheetOpen: () => void;
    onCheckboxValueChange: (value: boolean) => void;
    onCollapsibleOpenChange: (isOpen: boolean) => void;
    onPickerValueChange: (value: string) => void;
    onSliderValueChange: (value: number) => void;
    onSwitchValueChange: (value: boolean) => void;
    onTextValueChange: (value: string) => void;
};

export type ExpoUiShowcaseState = ExpoUiLivePreviewProps;

export type ExpoUiShowcaseSectionProps = PropsWithChildren<{
    description?: string;
    eyebrow: string;
    style?: StyleProp<ViewStyle>;
    title: string;
}>;
