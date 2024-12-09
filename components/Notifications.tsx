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
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const triggerNotification = async ({ title, body }: { title: string; body: string }) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: 'goofy.wav',
      },
      trigger: null,
    });
  };

  useEffect(() => {
    triggerNotification({ title: 'Bienvenue', body: 'Bienvenue sur notre application' });
  }, []);
};

export default NotificationHandler;
