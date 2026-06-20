import {
    BottomSheet as ExpoBottomSheet,
    Button as ExpoButton,
    Checkbox as ExpoCheckbox,
    Collapsible as ExpoCollapsible,
    Column as ExpoColumn,
    FieldGroup as ExpoFieldGroup,
    Host as ExpoHost,
    Icon as ExpoIcon,
    List as ExpoList,
    ListItem as ExpoListItem,
    Picker as ExpoPicker,
    RNHostView as ExpoRNHostView,
    Row as ExpoRow,
    ScrollView as ExpoScrollView,
    Slider as ExpoSlider,
    Spacer as ExpoSpacer,
    Switch as ExpoSwitch,
    Text as ExpoText,
    TextInput as ExpoTextInput,
} from "@expo/ui";
import {View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {AppText} from "../../../components/common";
import type {ExpoUiLivePreviewProps} from "../types/ExpoUiShowcaseTypes";

const sparkleIcon = ExpoIcon.select({
    android: require("../../../assets/expo-ui/sparkle.xml"),
    ios: "sparkles",
});

export function ExpoUiLivePreview({
    bottomSheetVisible,
    checkboxValue,
    collapsibleOpen,
    pickerValue,
    sliderValue,
    switchValue,
    textValue,
    onBottomSheetDismiss,
    onBottomSheetOpen,
    onCheckboxValueChange,
    onCollapsibleOpenChange,
    onPickerValueChange,
    onSliderValueChange,
    onSwitchValueChange,
    onTextValueChange,
}: ExpoUiLivePreviewProps) {
    const {theme} = useUnistyles();
    const sliderLabel = `Focus time: ${Math.round(sliderValue)} minutes`;

    return (
        <View style={styles.root}>
            <ExpoHost matchContents style={styles.host}>
                <ExpoColumn spacing={16}>
                    <ExpoRow alignment="center" spacing={8}>
                        <ExpoIcon
                            accessibilityLabel="Expo UI sparkle"
                            color={theme.colors.accentPrimaryStrong}
                            name={sparkleIcon}
                            size={22}
                        />
                        <ExpoText
                            textStyle={{
                                color: theme.colors.textPrimary,
                                fontSize: 19,
                                fontWeight: "700",
                            }}
                        >
                            Universal preview
                        </ExpoText>
                    </ExpoRow>
                    <ExpoText
                        textStyle={{
                            color: theme.colors.textSecondary,
                            fontSize: 14,
                            lineHeight: 20,
                        }}
                    >
                        Native controls rendered through one shared Expo UI
                        tree.
                    </ExpoText>
                    <ExpoRow alignment="center" spacing={8}>
                        <ExpoButton
                            label="Start"
                            onPress={() => undefined}
                            variant="filled"
                        />
                        <ExpoButton
                            label="Outline"
                            onPress={() => undefined}
                            variant="outlined"
                        />
                        <ExpoButton
                            label="Text"
                            onPress={() => undefined}
                            variant="text"
                        />
                    </ExpoRow>
                    <ExpoButton
                        label="Open bottom sheet"
                        onPress={onBottomSheetOpen}
                        variant="outlined"
                    />
                    <ExpoSwitch
                        label="Daily reminder"
                        onValueChange={onSwitchValueChange}
                        value={switchValue}
                    />
                    <ExpoCheckbox
                        label="Include saved sentences"
                        onValueChange={onCheckboxValueChange}
                        value={checkboxValue}
                    />
                    <ExpoText
                        textStyle={{
                            color: theme.colors.textSecondary,
                            fontSize: 14,
                        }}
                    >
                        {sliderLabel}
                    </ExpoText>
                    <ExpoSlider
                        max={60}
                        min={5}
                        onValueChange={onSliderValueChange}
                        step={5}
                        value={sliderValue}
                    />
                    <ExpoPicker
                        onValueChange={onPickerValueChange}
                        selectedValue={pickerValue}
                    >
                        <ExpoPicker.Item label="Balanced" value="balanced" />
                        <ExpoPicker.Item label="Grammar" value="grammar" />
                        <ExpoPicker.Item
                            label="Vocabulary"
                            value="vocabulary"
                        />
                    </ExpoPicker>
                    <ExpoTextInput
                        defaultValue={textValue}
                        onChangeText={onTextValueChange}
                        placeholder="Write a practice note"
                        returnKeyType="done"
                        style={{
                            backgroundColor: theme.colors.surfacePrimary,
                            borderColor: theme.colors.borderSubtle,
                            borderRadius: theme.radii.input,
                            borderWidth: 1,
                            padding: theme.spacing.md,
                        }}
                        textStyle={{
                            color: theme.colors.textPrimary,
                            fontSize: 15,
                        }}
                    />
                    <ExpoCollapsible
                        isOpen={collapsibleOpen}
                        label="Show native layout primitives"
                        onOpenChange={onCollapsibleOpenChange}
                    >
                        <ExpoColumn spacing={10}>
                            <ExpoRow alignment="center" spacing={8}>
                                <ExpoText>Row</ExpoText>
                                <ExpoSpacer size={10} />
                                <ExpoText>Spacer</ExpoText>
                                <ExpoSpacer size={10} />
                                <ExpoText>Column</ExpoText>
                            </ExpoRow>
                            <ExpoScrollView
                                direction="horizontal"
                                showsIndicators={false}
                            >
                                <ExpoRow spacing={8}>
                                    <ExpoButton
                                        label="Scroll"
                                        onPress={() => undefined}
                                        variant="outlined"
                                    />
                                    <ExpoButton
                                        label="Host"
                                        onPress={() => undefined}
                                        variant="outlined"
                                    />
                                    <ExpoButton
                                        label="RN view"
                                        onPress={() => undefined}
                                        variant="outlined"
                                    />
                                </ExpoRow>
                            </ExpoScrollView>
                            <ExpoRNHostView matchContents>
                                <View style={styles.rnHostBadge}>
                                    <AppText variant="caption" tone="accent">
                                        RNHostView content
                                    </AppText>
                                </View>
                            </ExpoRNHostView>
                        </ExpoColumn>
                    </ExpoCollapsible>
                    <ExpoBottomSheet
                        isPresented={bottomSheetVisible}
                        onDismiss={onBottomSheetDismiss}
                        snapPoints={["half", "full"]}
                    >
                        <ExpoColumn spacing={12}>
                            <ExpoText>BottomSheet</ExpoText>
                            <ExpoText>
                                Expo UI presents this with the platform sheet.
                            </ExpoText>
                            <ExpoButton
                                label="Close"
                                onPress={onBottomSheetDismiss}
                                variant="filled"
                            />
                        </ExpoColumn>
                    </ExpoBottomSheet>
                </ExpoColumn>
            </ExpoHost>
            <ExpoHost style={styles.collectionHost} useViewportSizeMeasurement>
                <ExpoColumn spacing={14}>
                    <ExpoFieldGroup>
                        <ExpoFieldGroup.Section title="FieldGroup">
                            <ExpoListItem supportingText="Native grouped row">
                                Review cadence
                            </ExpoListItem>
                            <ExpoListItem supportingText="Secondary row copy">
                                Teacher tone
                            </ExpoListItem>
                        </ExpoFieldGroup.Section>
                    </ExpoFieldGroup>
                    <ExpoList>
                        <ExpoListItem
                            supportingText="ListItem inside a native List"
                            trailing="Ready"
                        >
                            Practice queue
                        </ExpoListItem>
                        <ExpoListItem supportingText="Virtualized native row">
                            Saved vocabulary
                        </ExpoListItem>
                    </ExpoList>
                </ExpoColumn>
            </ExpoHost>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.lg,
    },
    host: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.sheet,
        borderWidth: 1,
        padding: theme.spacing.lg,
    },
    collectionHost: {
        backgroundColor: theme.colors.surfaceTonal,
        borderRadius: theme.radii.sheet,
        height: 300,
        overflow: "hidden",
        padding: theme.spacing.sm,
    },
    rnHostBadge: {
        alignSelf: "flex-start",
        backgroundColor: theme.colors.accentPrimarySoft,
        borderRadius: theme.radii.pill,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
}));
