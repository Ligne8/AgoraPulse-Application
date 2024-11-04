// index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from '@/app/(tabs)/WelcomePage';
import ClientOffer from '@/app/(tabs)/ClientOffer';
import RolePage from '@/app/(tabs)/RolePage';
import * as SplashScreen from 'expo-splash-screen';
import { RootStackParamList } from '@/components/types';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

export default function index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="RolePage" component={RolePage} />
        <Stack.Screen name="ClientOffer" component={ClientOffer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}