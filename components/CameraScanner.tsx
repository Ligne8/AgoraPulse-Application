import { CameraView } from 'expo-camera';
import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Overlay } from './Overlay';

interface CameraScannerProps {
  // eslint-disable-next-line
  setCode: (data: string) => void;
  code: string;
}

export default function CameraScanner({ setCode, code }: CameraScannerProps) {
  return (
    <SafeAreaView className="w-full h-full">
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
