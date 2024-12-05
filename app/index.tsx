import React from 'react';
import WelcomePage from './WelcomePage';
import NotificationHandler from '@/components/Notifications';

export default function Index() {
  return ( 
  NotificationHandler(),
  <WelcomePage />
  );
}