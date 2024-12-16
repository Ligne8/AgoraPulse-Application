import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function MerchantTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar, // Barre d'onglets personnalisée
        tabBarActiveTintColor: '#0E3D60',
        tabBarInactiveTintColor: '#8E8E93',
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
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
          tabBarIcon: ({ focused }) => <AntDesign name="plus" size={27} color={focused ? 'blue' : 'black'} />,
        }}
      />
      <Tabs.Screen
        name="DashboardPage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Entypo name="bar-graph" size={27} color={focused ? 'blue' : 'black'} />,
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <AntDesign name="user" size={27} color={focused ? 'blue' : 'black'} />,
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

        // Style spécial pour le bouton central
        if (route.name === 'SelectOfferTypePage') {
          return (
            <TouchableOpacity key={route.name} onPress={handlePress} style={styles.centerButton}>
              <View style={styles.centerIconContainer}>
                <AntDesign name="plus" size={40} color="white" />
              </View>
            </TouchableOpacity>
          );
        }

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
  centerButton: {
    top: -20, // Place le bouton central au-dessus de la barre d'onglets
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#0E3D60', // Couleur du bouton central
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0E3D60',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
