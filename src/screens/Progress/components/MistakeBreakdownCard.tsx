import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Icon, ProgressBar, Surface} from "../../../components/common";
import type {MistakeBreakdownRecord} from "../types/progressTypes";

type MistakeBreakdownCardProps = {
    records: MistakeBreakdownRecord[];
};

export function MistakeBreakdownCard({records}: MistakeBreakdownCardProps) {
    return (
        <Surface variant="card" style={styles.root}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Icon name="mistake" size="default" tone="warning" />
                    <View style={styles.titleCopy}>
                        <AppText variant="heading">Mistake focus</AppText>
                        <AppText tone="secondary" variant="bodySmall">
                            Patterns from local practice attempts.
                        </AppText>
                    </View>
                </View>
            </View>
            <View style={styles.list}>
                {records.map((record) => {
                    return (
                        <View key={record.id} style={styles.record}>
                            <View style={styles.recordHeader}>
                                <AppText variant="label">
                                    {record.label}
                                </AppText>
                                <AppText variant="caption" tone="secondary">
                                    {record.helper}
                                </AppText>
                            </View>
                            <ProgressBar
                                accessibilityLabel={`${record.label} ${record.value} of ${record.max}`}
                                max={record.max}
                                tone={record.tone}
                                value={record.value}
                            />
                        </View>
                    );
                })}
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    header: {
        gap: theme.spacing.xs,
    },
    titleRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
    },
    titleCopy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    list: {
        gap: theme.spacing.md,
    },
    record: {
        gap: theme.spacing.sm,
    },
    recordHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
    },
}));
