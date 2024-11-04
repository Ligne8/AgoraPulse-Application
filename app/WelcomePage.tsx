// WelcomePage.tsx
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CustomButton from '@/components/CustomButton';
import * as SplashScreen from 'expo-splash-screen';
import { RootStackParamList } from '@/components/types';
import { useFonts } from 'expo-font';

export default function WelcomePage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Utiliser useLayoutEffect pour masquer la navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} testID="logo" />
      <Text style={styles.title}>Bonjour !</Text>
      <Text style={styles.description}>Nous sommes ravis de vous accueillir. Connectez-vous pour découvrir les dernières promotions près de chez vous, ou inscrivez-vous pour commencer.</Text>

      {/* Utilisation du composant bouton pour Se connecter */}
      <CustomButton title="Se connecter" onPress={() => console.log('Se connecter')} backgroundColor="white" textColor="#0E3D60" />

      {/* Utilisation du composant bouton pour S'inscrire */}
      <CustomButton title="S'inscrire" onPress={() => navigation.navigate('RolePage')} backgroundColor="transparent" textColor="white" />
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
    fontSize: 24,
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
});