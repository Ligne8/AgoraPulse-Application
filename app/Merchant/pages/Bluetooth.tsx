import { useFonts } from 'expo-font';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import PulsatingIcon from '@/components/PulsatingIcon';
import { MaterialIcons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function ClientHome() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherche de votre boîtier</Text>
      <Text style={styles.description}>
        Veuillez patienter pendant que nous détectons votre boîtier Bluetooth à proximité.
      </Text>

      <View style={styles.iconWrapper}>
        <PulsatingIcon
          IconComponent={MaterialIcons}
          iconName="bluetooth-searching"
          iconSize={150}
          iconColor="#FFFFFF"
          circleSize={150}
          circleColor="#2A9BE2"
          animationDuration={1200}
        />
      </View>

      <Text style={styles.note}>Patientez quelques instants...</Text>
      <Text style={styles.noteDescription}>
        Assurez-vous que le boîtier est allumé et que le Bluetooth de votre appareil est activé.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#0E3D60',
    fontSize: 40,
    fontFamily: 'MontserratExtraBolt',
    marginTop: 100,
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    color: '#0E3D60',
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    marginVertical: 30,
    marginBottom: 100,
  },
  note: {
    color: '#0E3D60',
    fontSize: 23,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  noteDescription: {
    color: '#0E3D60',
    fontSize: 15,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
