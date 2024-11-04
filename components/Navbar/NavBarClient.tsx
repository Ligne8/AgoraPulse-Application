import React from 'react';
import {FontAwesome } from '@expo/vector-icons';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '@/app/(tabs)';
import RolePage from '@/app/(tabs)/RolePage';

/**
 * The functions HomeScreen, HomeStack... are to be modified for the actual app
 *
 */


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeScreen() {
    return (
        <>
            <WelcomeScreen/>
        </>
    );
}

function FavoritesScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Favorites!</Text>
        </View>
    );
}

function SellScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Sell!</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>My profile</Text>
        </View>
    );
}

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeMain" component={HomeScreen}/>
            <Stack.Screen name="RolePage" component={RolePage}/>
            {/* Add more screens in this stack as needed */}
        </Stack.Navigator>
    );
}

function SellStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SellMain" component={SellScreen}/>
            {/* Add more screens in this stack as needed */}
        </Stack.Navigator>
    );
}

function FavoritesStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="FavoritesMain" component={FavoritesScreen}/>
            {/* Add more screens in this stack as needed */}
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ProfileMain" component={ProfileScreen}/>
            {/* Add more screens in this stack as needed */}
        </Stack.Navigator>
    );
}

export default function NavBarClient() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Sell') {
                        iconName = 'tag';
                    } else if (route.name === 'Favorites') {
                        iconName = 'star';
                    } else if (route.name === 'Profil') {
                        iconName = 'user';
                    }
                    return <FontAwesome name={iconName} size={35} color={color}/>;
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
            <Tab.Screen name="Home" component={HomeStack}/>
            <Tab.Screen name="Sell" component={SellStack}/>
            <Tab.Screen name="Favorites" component={FavoritesStack}/>
            <Tab.Screen name="Profil" component={ProfileStack}/>
        </Tab.Navigator>
    );
}
