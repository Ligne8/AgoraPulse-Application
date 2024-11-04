// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '@/context/UserContext';
import { useUser } from '@/context/UserContext'; // Importer le contexte utilisateur


export default function Layout() {
  return (
    <UserProvider>
      <RootNavigation />
    </UserProvider>
  );
}

function RootNavigation() {
  const { userRole } = useUser();
  return (
    <Stack>
      <Stack.Screen name="WelcomePage" options={{ headerShown: false }} />
      <Stack.Screen name="RolePage" options={{ headerShown: false }} />
      
      {/* Navigation conditionnelle en fonction du rôle */}
      {userRole === 'client' && (
        <Stack.Screen name="client" options={{ headerShown: false }} />
      )}
      {userRole === 'merchant' && (
        <Stack.Screen name="merchant" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}