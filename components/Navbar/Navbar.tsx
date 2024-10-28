import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import WelcomeScreen from '../../app/(tabs)/index';
import NavBarClient from "@/components/Navbar/NavBarClient";
import NavBarMerchant from "@/components/Navbar/NavBarMerchant";

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <>
            <WelcomeScreen />
        </>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
export default function Navbar() {
  return (
      <NavigationContainer independent={true}>
          <NavBarClient />
      </NavigationContainer>
  );
}