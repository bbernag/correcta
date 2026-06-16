import {useState} from "react";

import {
    AppText,
    Button,
    Screen,
    Surface,
    TextInput,
} from "../../components/common";
import {
    runFoundationChecks,
    type FoundationCheckResult,
} from "../../native/foundationChecks";

export function ComponentPlaygroundScreen() {
    const [result, setResult] = useState<FoundationCheckResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    function handleRunChecks() {
        try {
            setResult(runFoundationChecks());
            setError(null);
        } catch (nativeError) {
            setResult(null);
            setError(
                nativeError instanceof Error
                    ? nativeError.message
                    : "Native check failed"
            );
        }
    }

    return (
        <Screen>
            <AppText variant="title">Component check</AppText>
            <Surface>
                <AppText variant="heading">Common controls</AppText>
                <TextInput
                    label="Sample answer"
                    placeholder="Write a short translation"
                    returnKeyType="done"
                />
                <Button
                    accessibilityLabel="Run native foundation checks"
                    label="Run native checks"
                    onPress={handleRunChecks}
                />
            </Surface>
            {result ? (
                <Surface variant="muted">
                    <AppText variant="label">Storage</AppText>
                    <AppText tone="secondary">{result.storage}</AppText>
                    <AppText variant="label">Date</AppText>
                    <AppText tone="secondary">{result.date}</AppText>
                    <AppText variant="label">HTTP</AppText>
                    <AppText tone="secondary">{result.http}</AppText>
                </Surface>
            ) : null}
            {error ? (
                <Surface variant="outline">
                    <AppText variant="label" tone="danger">
                        Native check failed
                    </AppText>
                    <AppText tone="secondary">{error}</AppText>
                </Surface>
            ) : null}
        </Screen>
    );
}
