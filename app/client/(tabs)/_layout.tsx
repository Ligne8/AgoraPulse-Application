import React from 'react';
import { Tabs } from 'expo-router';

export default function ClientTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="OfferPage"
        options={{ title: 'Offres' }}
      />
    </Tabs>
  );
}