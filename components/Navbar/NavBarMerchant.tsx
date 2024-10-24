import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

/**
 * The functions HomeScreen, HomeStack... are to be modified for the actual app
 *
 */

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screen components
function HomeScreen() {
    return (
        <View style={styles.screen}>
            <Text>Home!</Text>
        </View>
    );
}

function FavoritesScreen() {
    return (
        <View style={styles.screen}>
            <Text>Favorites!</Text>
        </View>
    );
}

function SellScreen() {
    return (
        <View style={styles.screen}>
            <Text>Sell!</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={styles.screen}>
            <Text>My profile</Text>
        </View>
    );
}

// Circle Icon for the Add button
const CircleIcon = () => (
    <View style={styles.circle}>
        <Text style={styles.plus}>+</Text>
    </View>
);

// Stack navigator for Home tab
function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

// Stack navigator for Sell tab
function SellStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SellMain" component={SellScreen} />
        </Stack.Navigator>
    );
}

// Bottom Tab Navigator with Stack Navigation
export default function NavBarMerchant() {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = '';
                        size = 35;
                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'QRCode') {
                            iconName = 'qrcode';
                        } else if (route.name === 'Add') {
                            return <CircleIcon />;
                        } else if (route.name === 'BI') {
                            iconName = 'bar-chart';
                        } else if (route.name === 'Profile') {
                            iconName = 'user';
                        }
                        return <FontAwesome name={iconName} size={size} color={color} />;
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#EEEEEE',
                        borderTopColor: 'transparent',
                        height: 70,
                        paddingBottom: 10,
                    },
                    tabBarActiveTintColor: '#0E3D60',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="QRCode" component={SellStack} />
                <Tab.Screen name="Add" component={FavoritesScreen} />
                <Tab.Screen name="BI" component={SellScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
    );
}

// Styles for the circular icon and screen layout
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2A9BE2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus: {
        color: 'white',
        fontSize: 36,
    },
});
