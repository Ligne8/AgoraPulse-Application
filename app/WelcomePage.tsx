// WelcomePage.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '@/components/CustomButton';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function WelcomePage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} testID="logo" />
      <Text style={styles.title}>Bonjour !</Text>
      <Text style={styles.description}>
        Nous sommes ravis de vous accueillir. Connectez-vous pour découvrir les dernières promotions près de chez vous,
        ou inscrivez-vous pour commencer.
      </Text>

      {/* Utilisation du composant bouton pour Se connecter */}
      <CustomButton
        title="Se connecter"
        onPress={() => router.push('/LoginPage')}
        backgroundColor="white"
        textColor="#0E3D60"
      />

      {/* Utilisation du composant bouton pour S'inscrire */}
      <CustomButton
        title="S'inscrire"
        onPress={() => router.push('/RolePage')}
        backgroundColor="transparent"
        textColor="white"
      />
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
