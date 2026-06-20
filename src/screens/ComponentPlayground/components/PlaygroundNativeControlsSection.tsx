import {useState} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    Icon,
    NativeBottomSheet,
    NativeCheckbox,
    NativeCollapsible,
    NativeDateTimePicker,
    NativeList,
    NativeMenu,
    NativePicker,
    NativeSlider,
    NativeSwitch,
    Surface,
} from "../../../components/common";
import {PlaygroundComponentSample} from "./PlaygroundComponentSample";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

export function PlaygroundNativeControlsSection() {
    const [dailyReminder, setDailyReminder] = useState(true);
    const [includeSaved, setIncludeSaved] = useState(false);
    const [focusMinutes, setFocusMinutes] = useState(20);
    const [pickerValue, setPickerValue] = useState("balanced");
    const [practiceDate, setPracticeDate] = useState(() => new Date());
    const [collapsibleOpen, setCollapsibleOpen] = useState(true);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [menuAction, setMenuAction] = useState("none");

    function handleRefresh() {
        return Promise.resolve();
    }

    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                description="Expo UI backed controls wrapped as Correcta common components."
                eyebrow="Native"
                title="Native adapters"
            />
            <PlaygroundSectionBody style={styles.stack}>
                <AppText variant="label">NativeHost-backed controls</AppText>
                <View style={styles.controlGrid}>
                    <PlaygroundComponentSample title="NativeSwitch">
                        <NativeSwitch
                            accessibilityLabel="Daily reminder native switch"
                            label="Daily reminder"
                            onValueChange={setDailyReminder}
                            value={dailyReminder}
                        />
                    </PlaygroundComponentSample>
                    <PlaygroundComponentSample title="NativeCheckbox">
                        <NativeCheckbox
                            accessibilityLabel="Include saved sentences native checkbox"
                            label="Include saved sentences"
                            onValueChange={setIncludeSaved}
                            value={includeSaved}
                        />
                    </PlaygroundComponentSample>
                </View>
                <PlaygroundComponentSample title="NativeSlider">
                    <View style={styles.sliderStack}>
                        <AppText variant="label">
                            Focus time: {Math.round(focusMinutes)} minutes
                        </AppText>
                        <NativeSlider
                            accessibilityLabel="Focus time native slider"
                            max={60}
                            min={5}
                            onValueChange={setFocusMinutes}
                            step={5}
                            value={focusMinutes}
                            style={styles.slider}
                        />
                    </View>
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="NativePicker">
                    <NativePicker
                        accessibilityLabel="Practice focus native picker"
                        onValueChange={setPickerValue}
                        selectedValue={pickerValue}
                        style={styles.picker}
                    >
                        <NativePicker.Item label="Balanced" value="balanced" />
                        <NativePicker.Item label="Grammar" value="grammar" />
                        <NativePicker.Item
                            label="Vocabulary"
                            value="vocabulary"
                        />
                    </NativePicker>
                </PlaygroundComponentSample>
                <View style={styles.row}>
                    <PlaygroundComponentSample title="NativeMenu">
                        <NativeMenu
                            actions={[
                                {
                                    id: "review",
                                    selected: true,
                                    title: "Review",
                                },
                                {id: "rename", title: "Rename deck"},
                                {
                                    destructive: true,
                                    id: "delete",
                                    title: "Delete deck",
                                },
                            ]}
                            onAction={setMenuAction}
                            title="Deck actions"
                        >
                            <Button
                                accessibilityLabel="Open native menu example"
                                label="Menu"
                                size="small"
                                variant="secondary"
                            />
                        </NativeMenu>
                    </PlaygroundComponentSample>
                    <PlaygroundComponentSample title="NativeBottomSheet">
                        <Button
                            accessibilityLabel="Open native bottom sheet example"
                            label="Sheet"
                            onPress={() => setSheetVisible(true)}
                            size="small"
                            variant="tertiary"
                        />
                    </PlaygroundComponentSample>
                    <AppText variant="caption" tone="muted">
                        Last action: {menuAction}
                    </AppText>
                </View>
                <PlaygroundComponentSample title="NativeCollapsible and NativeDateTimePicker">
                    <NativeCollapsible
                        isOpen={collapsibleOpen}
                        label="Schedule practice"
                        onOpenChange={setCollapsibleOpen}
                    >
                        <View style={styles.collapsibleContent}>
                            <AppText variant="bodySmall" tone="secondary">
                                Pick a quiet practice moment with the native
                                date control.
                            </AppText>
                            <NativeDateTimePicker
                                display="compact"
                                mode="date"
                                onValueChange={(_event, nextDate) =>
                                    setPracticeDate(nextDate)
                                }
                                presentation="inline"
                                value={practiceDate}
                            />
                        </View>
                    </NativeCollapsible>
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="NativeList">
                    <NativeList
                        onRefresh={handleRefresh}
                        style={styles.nativeList}
                    >
                        <NativeList.Item>
                            Practice queue
                            <NativeList.Item.Supporting>
                                12 cards ready for a short session
                            </NativeList.Item.Supporting>
                            <NativeList.Item.Trailing>
                                <AppText variant="caption" tone="accent">
                                    Ready
                                </AppText>
                            </NativeList.Item.Trailing>
                        </NativeList.Item>
                        <NativeList.Item>
                            Saved vocabulary
                            <NativeList.Item.Leading>
                                <Icon name="saved" tone="success" />
                            </NativeList.Item.Leading>
                            <NativeList.Item.Supporting>
                                Review words saved this week
                            </NativeList.Item.Supporting>
                        </NativeList.Item>
                    </NativeList>
                </PlaygroundComponentSample>
                <NativeBottomSheet
                    contentStyle={styles.sheetContent}
                    isPresented={sheetVisible}
                    onDismiss={() => setSheetVisible(false)}
                    snapPoints={["50%", "90%"]}
                >
                    <Surface variant="card" style={styles.sheetSurface}>
                        <AppText variant="title">Native bottom sheet</AppText>
                        <AppText variant="bodySmall" tone="secondary">
                            Correcta content stays React Native while the sheet
                            presentation remains native.
                        </AppText>
                        <Button
                            accessibilityLabel="Close native bottom sheet example"
                            label="Close"
                            onPress={() => setSheetVisible(false)}
                            variant="secondary"
                        />
                    </Surface>
                </NativeBottomSheet>
            </PlaygroundSectionBody>
        </PlaygroundSectionRoot>
    );
}

const styles = StyleSheet.create((theme) => ({
    stack: {
        gap: theme.spacing.xl,
    },
    controlGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    sliderStack: {
        gap: theme.spacing.sm,
    },
    slider: {
        width: 260,
    },
    picker: {
        width: 240,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.md,
    },
    collapsibleContent: {
        gap: theme.spacing.md,
    },
    nativeList: {
        height: 180,
    },
    sheetContent: {
        padding: theme.spacing.xl,
    },
    sheetSurface: {
        gap: theme.spacing.lg,
    },
}));
