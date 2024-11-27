import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import PulsatingIcon from '@/components/PulsatingIcon';
import { MaterialIcons } from '@expo/vector-icons';
import { BluetoothModal } from '@/components/BluetoothModal';

SplashScreen.preventAutoHideAsync();

export default function Bluetooth() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const [modalOpen, setModalOpen] = useState(false);

  const device = 'AgoraPulse-0213';
  // Open the modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const ModalButton = ({
    title,
    onPress,
    backgroundColor,
    textColor,
  }: {
    title: string;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  }) => (
    <TouchableOpacity style={[styles.modalButton, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.modalButtonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );

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
      <BluetoothModal isOpen={modalOpen}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Appareil détecté</Text>
          <Text style={styles.modalDescription}>Souhaitez-vous associer {device} ?</Text>
          <View style={styles.buttonContainer}>
            <ModalButton
              title="Annuler"
              onPress={() => setModalOpen(false)}
              backgroundColor="#D9D9D9"
              textColor="#0E3D60"
            />
            <ModalButton
              title="Confirmer"
              onPress={() => console.log('Boîtier associé')}
              backgroundColor="#0E3D60"
              textColor="#FFFFFF"
            />
          </View>
        </View>
      </BluetoothModal>
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
    fontFamily: 'MontserratExtraBold',
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
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    color: '#0E3D60',
    fontSize: 23,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  modalDescription: {
    color: '#0E3D60',
    fontSize: 15,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 100,
    height: 50,
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: 'MontserratBold',
    color: '#0E3D60',
    textAlign: 'center',
  },
});
