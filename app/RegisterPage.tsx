import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
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
  const { userRole } = useUser();

  const handleRegister = () => {
    if (userRole === 'client') {
      console.log('Je m’inscris en tant que client');
      router.push('/client/pages/RegisterPage');
    } else if (userRole === 'merchant') {
      console.log('Je m’inscris en tant que commerçant');
      router.push('/Merchant/pages/RegisterPage1');
    } else {
      // Handle case where userRole is null or undefined
      console.error('User role is not defined');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} testID="logo" />
      <Text style={[styles.title, { textAlign: 'center' }]}>Inscription</Text>
      <Text style={styles.description}>Créez votre compte pour profiter de nos services.</Text>
      <EntryField
        icon={faUser}
        title="Prénom"
        placeholder="Entrez votre prénom"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
      />
      <EntryField
        icon={faUser}
        title="Nom"
        placeholder="Entrez votre nom"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
      />
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
      <EntryField
        icon={faLock}
        title="Confirmer votre mot de passe"
        placeholder="Confirmez votre mot de passe"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
        secureText={true}
      />
      <CustomButton title="S'inscrire" onPress={() => handleRegister()} backgroundColor="#0E3D60" textColor="#FFFFFF" />
      <View style={styles.inlineTextContainer}>
        <Text style={styles.hint}>Vous avez déjà un compte ? </Text>
        <TouchableOpacity onPress={() => router.push('/LoginPage')}>
          <Text style={[styles.hint, { fontWeight: 'bold' }]}>Connectez-vous ici</Text>
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
    fontFamily: 'MontserratExtraBold',
    marginBottom: 10,
    marginTop: 0,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 0,
    marginTop: 60,
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
