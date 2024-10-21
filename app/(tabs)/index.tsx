import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Bonjour !</Text>

      <Text style={styles.description}>
        Nous sommes ravis de vous accueillir. Connectez-vous pour découvrir les dernières promotions près de chez vous, ou inscrivez-vous pour commencer.
      </Text>

      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signUpText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E3D60',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 319,
    height: 319,
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'MontserratBold',
    marginBottom: 15,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 40,
  },
  connectButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 20,
    marginBottom: 20,
  },
  connectButtonText: {
    color: '#0E3D60',
    fontSize: 18,
    fontFamily: 'MontserratBold',
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat',
  },
});