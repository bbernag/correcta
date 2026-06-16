import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";

export function App() {
    return (
        <View style={styles.root}>
            <Text style={styles.eyebrow}>Conecta</Text>
            <Text style={styles.title}>Foundation build</Text>
            <Text style={styles.body}>
                Expo Dev Client scaffold is ready for native validation.
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        backgroundColor: "#F7F6F2",
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    eyebrow: {
        color: "#1E3A8A",
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 0,
        marginBottom: 12,
        textTransform: "uppercase",
    },
    title: {
        color: "#1F2933",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 12,
        textAlign: "center",
    },
    body: {
        color: "#667085",
        fontSize: 16,
        lineHeight: 22,
        maxWidth: 320,
        textAlign: "center",
    },
});
