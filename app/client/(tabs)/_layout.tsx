import React from 'react';
import { Tabs } from 'expo-router';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function ClientTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar, // Style personnalisé pour la barre
        tabBarShowLabel: false, // Cache les labels sous les icônes
        tabBarActiveTintColor: '#0E3D60',
        tabBarInactiveTintColor: '#8E8E93',
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="ClientHome"
        options={{
          headerShown: false,
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="OfferPage"
        options={{
          headerShown: false,
          title: 'Offres',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="discount" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ClientLoyaltyPage"
        options={{
          headerShown: false,
          title: 'Fidélité',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="star" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          headerShown: false,
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={route.name} onPress={handlePress} style={styles.tabButton}>
            {options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? '#0E3D60' : '#8E8E93',
              size: 27,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 65,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Ombre sur Android
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
