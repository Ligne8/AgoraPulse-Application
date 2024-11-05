// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '@/context/UserContext';

export default function Layout() {
  return (
    <UserProvider>
      <ConditionalNavigation />
    </UserProvider>
  );
}

function ConditionalNavigation() {
  return (
    <Stack>
      <Stack.Screen name="WelcomePage" options={{ headerShown: false }} />
      <Stack.Screen name="RolePage" options={{ headerShown: false }} />
      <Stack.Screen name="client/pages/RegisterPage" options={{ headerShown: false }} />
      <Stack.Screen name="client/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
