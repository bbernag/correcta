import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StyleSheet} from "react-native-unistyles";

import {PracticeCorrectToast} from "./PracticeCorrectToast";

const TOAST_BOTTOM_OFFSET = 24;

type PracticeCorrectToastOverlayProps = {
    durationMs: number;
    onDismiss: (toastId: string) => void;
    onSaveSentence: () => void;
    toastId: string | null;
};

export function PracticeCorrectToastOverlay({
    durationMs,
    onDismiss,
    onSaveSentence,
    toastId,
}: PracticeCorrectToastOverlayProps) {
    const insets = useSafeAreaInsets();

    if (!toastId) {
        return null;
    }

    const activeToastId = toastId;

    function handleDismiss() {
        onDismiss(activeToastId);
    }

    return (
        <View
            pointerEvents="box-none"
            style={[
                styles.overlay,
                {bottom: insets.bottom + TOAST_BOTTOM_OFFSET},
            ]}
        >
            <PracticeCorrectToast
                durationMs={durationMs}
                key={activeToastId}
                onDismiss={handleDismiss}
                onSaveSentence={onSaveSentence}
            />
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    overlay: {
        elevation: 24,
        left: 0,
        paddingHorizontal: theme.spacing.screenHorizontal,
        position: "absolute",
        right: 0,
        zIndex: 24,
    },
}));
