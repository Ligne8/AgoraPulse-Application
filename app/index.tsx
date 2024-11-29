import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native';
import BLEScanner from '@/components/BLEScanner';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BLEScanner />
    </SafeAreaView>
  );
}
