import {formatDateTime, now} from "@bernagl/react-native-date";

export function getNativeDateLabel() {
    return formatDateTime(now());
}
