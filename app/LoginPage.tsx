/* eslint-disable @typescript-eslint/no-require-imports */
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function LoginPage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
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
      <Text style={[styles.title, { textAlign: 'center' }]}>Connexion</Text>
      <Text style={styles.description}>Veuillez entrer vos identifiants pour accéder à votre compte.</Text>
      <EntryField
        icon={faEnvelope}
        title="Email"
        placeholder="Entrez votre adresse email"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
      />
      <EntryField
        icon={faLock}
        title="Mot de passe"
        placeholder="Entrez votre mot de passe"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
        secureText={true}
      />
      <CustomButton
        title="Se connecter"
        onPress={() => console.log('S’inscrire')}
        backgroundColor="#0E3D60"
        textColor="#FFFFFF"
        width="100%"
      />

      <View style={styles.inlineTextContainer}>
        <Text style={styles.hint}>Pas encore de compte ? </Text>
        <TouchableOpacity onPress={() => router.push('/RolePage')}>
          <Text style={[styles.hint, { fontWeight: 'bold' }]}>Inscrivez-vous ici</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#0E3D60',
    fontSize: 38,
    fontFamily: 'MontserratExtraBolt',
    marginBottom: 10,
    marginTop: 0,
  },
  logo: {
    width: 175,
    height: 175,
    marginBottom: 40,
  },
  description: {
    color: '#0E3D60',
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 20,
  },
  hint: {
    color: '#0E3D60',
    fontSize: 13.5,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 40,
  },
  inlineTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
});
