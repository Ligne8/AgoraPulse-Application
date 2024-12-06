import React from 'react';
import { Tabs } from 'expo-router';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function ClientTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0E3D60',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tabs.Screen
        name="ClientHome"
        options={{
          headerShown: false,
          title: 'Accueil',
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="home"
              size={size}
              color={color}
              style={focused ? styles.activeIcon : null} // Highlight si actif
            />
          ),
        }}
      />
      <Tabs.Screen
        name="OfferPage"
        options={{
          headerShown: false,
          title: 'Offres',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="discount"
              size={size}
              color={color}
              style={focused ? styles.activeIcon : null} // Highlight si actif
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ClientLoyaltyPage"
        options={{
          headerShown: false,
          title: 'Fidélité',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="star"
              size={size}
              color={color}
              style={focused ? styles.activeIcon : null} // Highlight si actif
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          headerShown: false,
          title: 'Profil',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="user"
              size={size}
              color={color}
              style={focused ? styles.activeIcon : null} // Highlight si actif
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    height: 75,
  },
  activeIcon: {
    transform: [{ scale: 1.2 }],
  },
});
