import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {Button} from "../../../components/common";

type PracticeActionBarProps = {
    canSubmit: boolean;
    hasHiddenHints: boolean;
    isChecking: boolean;
    onShowHint: () => void;
    onSkip: () => void;
    onSubmitAnswer: () => void;
};

export function PracticeActionBar({
    canSubmit,
    hasHiddenHints,
    isChecking,
    onShowHint,
    onSkip,
    onSubmitAnswer,
}: PracticeActionBarProps) {
    return (
        <View style={styles.root}>
            <Button
                accessibilityLabel="Check answer"
                disabled={!canSubmit}
                fullWidth
                label="Check answer"
                loading={isChecking}
                loadingLabel="Checking answer"
                onPress={onSubmitAnswer}
            />
            <View style={styles.secondaryActions}>
                <Button
                    disabled={isChecking}
                    label="Skip"
                    onPress={onSkip}
                    style={styles.secondaryAction}
                    variant="secondary"
                />
                {hasHiddenHints ? (
                    <Button
                        disabled={isChecking}
                        label="Show hint"
                        onPress={onShowHint}
                        style={styles.secondaryAction}
                        variant="ghost"
                    />
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    secondaryActions: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    secondaryAction: {
        flex: 1,
    },
}));
