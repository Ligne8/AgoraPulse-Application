import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import WelcomePage from './WelcomePage';

SplashScreen.preventAutoHideAsync();

export default function index() {
  return (
        <WelcomePage />
  );
}