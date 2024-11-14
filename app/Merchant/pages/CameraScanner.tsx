import { CameraView } from 'expo-camera';
import { Stack } from 'expo-router';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { Overlay } from '../../../components/Overlay';

interface CameraScannerProps {
  setCode: (code: string) => void;
  code: string;
}

export default function CameraScanner({ setCode, code }: CameraScannerProps) {
  return (
    <SafeAreaView className="w-full h-full">
      <Stack.Screen
        options={{
          title: 'Overview',
          headerShown: false,
        }}
      />
      {Platform.OS === 'android' ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && code != data) {
            setTimeout(async () => {
              setCode(data);
              console.log(data);
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}
