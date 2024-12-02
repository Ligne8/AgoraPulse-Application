import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function MerchantTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="HomePage"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="CameraScanner"
        options={{
          title: 'Scan',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="qrcode" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
