import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import WelcomePage from '@/app/(tabs)/WelcomPage';

SplashScreen.preventAutoHideAsync();

export default function index() {
  return <WelcomePage />;
}
