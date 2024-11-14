import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import WelcomePage from './WelcomePage';
import HomePage from './Merchant/pages/HomePage';

SplashScreen.preventAutoHideAsync();

export default function index() {
  return <HomePage />;
}
