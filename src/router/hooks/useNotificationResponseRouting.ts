import type {NavigationContainerRefWithCurrent} from "@react-navigation/native";
import {useCallback, useEffect, useRef} from "react";

import {
    addNotificationResponseRouteListener,
    clearLastNotificationResponseRoute,
    configureNotificationPresentation,
    getLastNotificationResponseRoute,
    type NotificationResponseRoute,
} from "../../native/notifications";
import type {RootStackParamList} from "../types";

export function useNotificationResponseRouting(
    navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>
) {
    const pendingRouteRef = useRef<NotificationResponseRoute | null>(null);

    const navigateToNotificationRoute = useCallback(
        (route: NotificationResponseRoute) => {
            if (!navigationRef.isReady()) {
                pendingRouteRef.current = route;
                return;
            }

            // Skip when already on the target tab so a duplicate response
            // delivery (cold-start getLast + listener) does not navigate twice.
            if (navigationRef.getCurrentRoute()?.name === route.routeName) {
                return;
            }

            navigationRef.navigate("MainTabs", {
                screen: route.routeName,
            });
        },
        [navigationRef]
    );

    const handleNavigationReady = useCallback(() => {
        const pendingRoute = pendingRouteRef.current;

        if (!pendingRoute) {
            return;
        }

        pendingRouteRef.current = null;
        navigateToNotificationRoute(pendingRoute);
    }, [navigateToNotificationRoute]);

    useEffect(() => {
        configureNotificationPresentation();

        const initialRoute = getLastNotificationResponseRoute();

        if (initialRoute) {
            navigateToNotificationRoute(initialRoute);
            // Clear it so a later remount does not re-navigate to a stale tap.
            void clearLastNotificationResponseRoute();
        }

        const subscription = addNotificationResponseRouteListener(
            navigateToNotificationRoute
        );

        return () => {
            subscription.remove();
        };
    }, [navigateToNotificationRoute]);

    return {handleNavigationReady};
}
