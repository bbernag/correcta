import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StyleSheet} from "react-native-unistyles";

import {Toast} from "../../../components/common";
import type {ToastInstance} from "../../../components/common";

const TOAST_BOTTOM_OFFSET = 24;

type PracticeStatusToastOverlayProps = {
    onDismiss: (toastId: string) => void;
    toast: ToastInstance | null;
};

export function PracticeStatusToastOverlay({
    onDismiss,
    toast,
}: PracticeStatusToastOverlayProps) {
    const insets = useSafeAreaInsets();

    if (!toast) {
        return null;
    }

    return (
        <View
            pointerEvents="box-none"
            style={[styles.overlay, {bottom: insets.bottom + TOAST_BOTTOM_OFFSET}]}
        >
            <Toast instance={toast} key={toast.id} onDismiss={onDismiss} />
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
