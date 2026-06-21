import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, NoticeCard} from "../../../components/common";
import type {HomeTeacherTip} from "../types/homeTypes";

type TeacherTipCardProps = {
    tip: HomeTeacherTip;
};

export function TeacherTipCard({tip}: TeacherTipCardProps) {
    return (
        <NoticeCard icon="hint" title={tip.title} tone="info">
            <View style={styles.content}>
                <AppText tone="secondary">{tip.body}</AppText>
                <AppText tone="muted" variant="caption">
                    {tip.contextLabel}
                </AppText>
            </View>
        </NoticeCard>
    );
}

const styles = StyleSheet.create((theme) => ({
    content: {
        gap: theme.spacing.sm,
    },
}));
