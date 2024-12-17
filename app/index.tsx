import React from 'react';
import WelcomePage from './WelcomePage';
import * as Notifications from 'expo-notifications';

export default function Index() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  return <WelcomePage />;
}
