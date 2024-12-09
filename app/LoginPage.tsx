import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import supabase, { getUserData } from '@/backend/client';

SplashScreen.preventAutoHideAsync();

interface LoginSupabaseResponse {
  data: any;
  error: any;
}

export default function LoginPage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const router = useRouter();

  const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleLogin = async () => {
    if (!mailRegex.test(email)) {
      alert('Email invalide');
      return;
    }
    if (password == '') {
      alert('Mot de passe invalide');
      return;
    }
    const res: LoginSupabaseResponse = await supabase.auth.signInWithPassword({ email, password });
    if (res.data.session == null && res.error != null) {
      alert('Email ou mot de passe incorrect');

      return;
    }
    try {
      const user: any = await getUserData();
      const is_profil_complete = user.profil_completed;
      if (user.role == 'client') {
        if (is_profil_complete) {
          router.push('/client/(tabs)/ClientHome');
        } else {
          router.push('/client/pages/RegisterPage');
        }
      } else if (user.role == 'merchant') {
        if (is_profil_complete) {
          router.push('/Merchant/(tabs)/HomePage');
        } else {
          router.push('/Merchant/pages/RegisterPage1');
        }
      }
    } catch {
      alert('Erreur lors de la connexion');
      return;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} testID="logo" />
      <Text style={[styles.title, { textAlign: 'center' }]}>Connexion</Text>
      <Text style={styles.description}>Veuillez entrer vos identifiants pour accéder à votre compte.</Text>
      <EntryField
        onChangeText={setEmail}
        icon={faEnvelope}
        title="Email"
        placeholder="Entrez votre adresse email"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
      />
      <EntryField
        icon={faLock}
        onChangeText={setPassword}
        title="Mot de passe"
        placeholder="Entrez votre mot de passe"
        backgroundColor="#f2f2f2"
        descriptionColor="#6c7a93"
        secureText={true}
      />
      <CustomButton
        title="Se connecter"
        onPress={handleLogin}
        backgroundColor="#0E3D60"
        textColor="#FFFFFF"
        width="100%"
      />

      <View style={styles.inlineTextContainer}>
        <Text style={styles.hint}>Pas encore de compte ? </Text>
        <TouchableOpacity
          onPress={() => {
            router.push('/RolePage');
          }}
        >
          <Text style={[styles.hint, { fontWeight: 'bold' }]}>Inscrivez-vous ici</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
