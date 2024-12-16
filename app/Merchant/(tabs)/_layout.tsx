import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, Entypo } from '@expo/vector-icons';

export default function MerchantTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="HomePage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <AntDesign name="home" size={27} color={focused ? 'blue' : 'black'} />,
        }}
      />
      <Tabs.Screen
        name="ScanCodePage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <AntDesign name="qrcode" size={27} color={focused ? 'blue' : 'black'} />,
        }}
      />
      <Tabs.Screen
        name="SelectOfferTypePage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <AntDesign name="pluscircle" size={27} color={focused ? 'blue' : 'black'} />,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="DashboardPage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Entypo name="bar-graph" size={27} color={focused ? 'blue' : 'black'} />,
          tabBarStyle: { display: 'flex' },
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <AntDesign name="user" size={27} color={focused ? 'blue' : 'black'} />,
          tabBarStyle: { display: 'flex' },
        }}
      />
    </Tabs>
  );
}
