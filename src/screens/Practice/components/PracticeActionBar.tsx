import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {Button} from "../../../components/common";

type PracticeActionBarProps = {
    hasHiddenHints: boolean;
    isChecking: boolean;
    onShowHint: () => void;
};

export function PracticeActionBar({
    hasHiddenHints,
    isChecking,
    onShowHint,
}: PracticeActionBarProps) {
    if (!hasHiddenHints) {
        return null;
    }

    return (
        <View style={styles.secondaryActions}>
            <Button
                disabled={isChecking}
                label="Show hint"
                onPress={onShowHint}
                style={styles.secondaryAction}
                variant="ghost"
            />
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    secondaryActions: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    secondaryAction: {
        flex: 1,
    },
}));
