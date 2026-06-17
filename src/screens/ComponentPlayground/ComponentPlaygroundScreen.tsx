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
    const [isChecking, setIsChecking] = useState(false);

    async function handleRunChecks() {
        try {
            setIsChecking(true);
            setResult(await runFoundationChecks());
            setError(null);
        } catch (nativeError) {
            setResult(null);
            setError(
                nativeError instanceof Error
                    ? nativeError.message
                    : "Foundation check failed"
            );
        } finally {
            setIsChecking(false);
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
                    label="Run foundation checks"
                    loading={isChecking}
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
                    <AppText variant="label">Domain</AppText>
                    <AppText tone="secondary">
                        {result.domain.sentences}
                    </AppText>
                    <AppText tone="secondary">{result.domain.history}</AppText>
                    <AppText tone="secondary">
                        {result.domain.savedContent}
                    </AppText>
                    <AppText tone="secondary">{result.domain.review}</AppText>
                    <AppText tone="secondary">{result.domain.progress}</AppText>
                    <AppText tone="secondary">
                        Malformed validation {result.domain.malformedValidation}
                    </AppText>
                </Surface>
            ) : null}
            {error ? (
                <Surface variant="outline">
                    <AppText variant="label" tone="danger">
                        Foundation check failed
                    </AppText>
                    <AppText tone="secondary">{error}</AppText>
                </Surface>
            ) : null}
        </Screen>
    );
}
