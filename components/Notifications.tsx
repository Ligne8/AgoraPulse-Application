import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const NotificationHandler = () => {
  useEffect(() => {
    async function loadNotification() {
      Notifications.requestPermissionsAsync();
      const token = (await Notifications.getDevicePushTokenAsync()).data;
      console.log('Push token:', token);
    }
    loadNotification();
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const triggerNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello!',
        body: 'Ceci est une notification locale',
        sound: true,
        data: { extraData: 'Some data' },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5 },
    });
  };

  useEffect(() => {
    triggerNotification();
  }, []);
};

export default NotificationHandler;