import * as Notifications from 'expo-notifications';

async function loadNotification() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission de notifications refusée.');
    return;
  }
  const token = (await Notifications.getDevicePushTokenAsync()).data;
  console.log('Push token:', token);
}

export async function TriggerNotification({ title, body }: { title: string; body: string }) {
  console.log('Notification envoyée :', title, body);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: 'goofy.wav',
    },
    trigger: null,
  });
}

export async function NotificationHandler({ title, body }: { title: string; body: string }) {
  await loadNotification();
  await TriggerNotification({ title, body });
}
