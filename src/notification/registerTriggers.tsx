import { usePedometerStore } from "../state/pedometerStore";
import { useWaterStore } from "../state/waterStore"
import { creatTimeStampNotification } from "./NotificationUtils";
import notifee from '@notifee/react-native'


const INTERVAL_NOTIFICATION_ID = 'water-reminder'

const createHourlyReminder = async () => {
    const startHour = 9;
    const endHour = 23;
    const interval = 2;
    let counter = 1;
    for (let hour = startHour; hour <= endHour; hour += interval) {
        await creatTimeStampNotification(
            require('../assets/images/water.png'),
            'water Reminder',
            'Time to drink water! keep up to good work!',
            hour,
            0,
            `${INTERVAL_NOTIFICATION_ID}-${counter}`
        )
        counter++;
    }
}

export const registeringAllTriggres = async () => {

    const { waterDrinkStamps, resetWaterIntake } = useWaterStore.getState();

    const { initializeStepsForTheDay } = usePedometerStore.getState();
    initializeStepsForTheDay();

    // Good Morning
    creatTimeStampNotification(
        require('../assets/images/gm.png'),
        'Good Morning',
        'Start your day with positivity',
        6,
        0,
        'good-morning'
    )

    // Good Night
    creatTimeStampNotification(
        require('../assets/images/gn.png'),
        'Good Night',
        'End your day with peace and relaxation',
        22,
        0,
        'good-night'
    )

    // walking reminder- morning walk
    creatTimeStampNotification(
        require('../assets/images/run.png'),
        'Healthy Walking!',
        'Take a step today towards a healthier you!',
        7,
        0,
        'daily-walking-morning'
    )

    // walking reminder- evening walk
    creatTimeStampNotification(
        require('../assets/images/run.png'),
        'Healthy Walking!',
        'Take a step today towards a healthier you!',
        18,
        0,
        'daily-walking-morning'
    )

    // water reminder
    if (waterDrinkStamps.length != 8) {
        await createHourlyReminder()
    } else {
        const notifications = await notifee.getTriggerNotifications()
        let counter = 1;
        for (const notification of notifications) {
            if (notification.notification.id === `${INTERVAL_NOTIFICATION_ID}-${counter}`) {
                await notifee.cancelNotification(notification.notification.id);
            }
            counter++;
        }
    }

    // Reset water intack every day when app opens
    const now = new Date()
    const currentDate = now.toISOString().split('T')[0];
    const isFromPreviousDay = (timestamps: string[]) => {
        if (timestamps.length === 0) return true;
        const lastTimeStamp = new Date(timestamps[timestamps.length - 1]);
        const lastDate = lastTimeStamp.toISOString().split('T')[0];
        return lastDate !== currentDate
    }

    if (isFromPreviousDay(waterDrinkStamps)) {
        resetWaterIntake()
    }

} 