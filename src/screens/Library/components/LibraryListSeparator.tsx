import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

export function LibraryListSeparator() {
    return <View style={styles.root} />;
}

const styles = StyleSheet.create((theme) => ({
    root: {
        height: theme.spacing.md,
    },
}));
