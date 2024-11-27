import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import supabase from '@/backend/client';

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmedPassword, setConfirmedPassword] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const router = useRouter();
  const { userRole } = useUser();

  const handleRegister = async () => {
    if (password !== confirmedPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    if (firstname.length < 2) {
      alert('Le prénom doit contenir au moins 2 caractères');
      return;
    }
    if (lastname.length < 2) {
      alert('Le nom doit contenir au moins 2 caractères');
      return;
    }
    if (email.length < 6) {
      // eslint-disable-next-line
      alert("L'email doit contenir au moins 6 caractères");
      return;
    }
    const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!mailRegex.test(email)) {
      alert('Email invalide');
      return;
    }
    if (password == '') {
      alert('Mot de passe invalide');
      return;
    }
    const res = await supabase.auth.signUp({ email, password });
    if (res.error) {
      // eslint-disable-next-line
      alert("Erreur lors de l'inscription");
      console.log(res.error);
      return;
    }
    const resUserApp = await supabase
      .from('UserApp')
      .insert([{ email: email, firstname: firstname, lastname: lastname, role: userRole }])
      .select();
    if (resUserApp.error) {
      // eslint-disable-next-line
      alert("Erreur lors de l'inscription");
      console.log(resUserApp.error);
      return;
    }
    alert('Inscription réussie');
    router.push('/LoginPage');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} testID="logo" />
      <Text style={[styles.title, { textAlign: 'center' }]}>Inscription</Text>
      <Text style={styles.description}>Créez votre compte pour profiter de nos services.</Text>
      <EntryField
        onChangeText={setFirstname}
        icon={faUser}
        title="Prénom"
        placeholder="Entrez votre prénom"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
      />
      <EntryField
        onChangeText={setLastname}
        icon={faUser}
        title="Nom"
        placeholder="Entrez votre nom"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
      />
      <EntryField
        onChangeText={setEmail}
        icon={faEnvelope}
        title="Email"
        placeholder="Entrez votre adresse email"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
      />
      <EntryField
        onChangeText={setPassword}
        icon={faLock}
        title="Mot de passe"
        placeholder="Entrez votre mot de passe"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
        secureText={true}
      />
      <EntryField
        onChangeText={setConfirmedPassword}
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
    fontFamily: 'MontserratExtraBolt',
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
