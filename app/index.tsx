import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import WelcomePage from './WelcomePage';
import ScanCodePage from './Merchant/pages/ScanCodePage';

SplashScreen.preventAutoHideAsync();

export default function index() {
  return <ScanCodePage />;
}
