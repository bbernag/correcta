import {useEffect} from "react";

import {createCorrectaServices} from "../../services/domain";

// Reschedules local reminders once when the app launches, so reminders re-arm
// without tying native scheduling to a screen read (see getReminderState).
export function useReminderLaunchSync() {
    useEffect(() => {
        void createCorrectaServices().reminders.syncReminders();
    }, []);
}
