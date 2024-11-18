import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function ClientTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="ClientHome"
        options={{
          title: 'Accueil',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="OfferPage"
        options={{
          title: 'Offres',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="discount" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ClientLoyaltyPage"
        options={{
          title: 'Fidélité',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="star" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          title: 'Profil',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
