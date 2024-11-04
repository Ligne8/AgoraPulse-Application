import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import CustomButton from '@/components/CustomButton'; // Importe ton composant bouton

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);
  //
  // const navigation = useNavigation();


  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     tabBarStyle: { display: "none" },
  //   });
  // }, [navigation]);


  if (!fontsLoaded) {
    return null;
  }

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
        onPress={() => console.log('Se connecter')}
        backgroundColor="white"
        textColor="#0E3D60"
      />

      {/* Utilisation du composant bouton pour S'inscrire */}
      <CustomButton
        title="S'inscrire"
        onPress={() => console.log('S\'inscrire')}
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
    color: 'white',
    fontSize: 40,
    fontFamily: 'MontserratExtraBolt',
    marginBottom: 15,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 40,
  },
});
