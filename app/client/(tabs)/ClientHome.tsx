import { useFonts } from 'expo-font';
import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CustomButton from '@/components/CustomButton';
import PulsatingIcon from '@/components/PulsatingIcon';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import useBLE from '@/components/BLEScanner';
import { useFocusEffect } from 'expo-router';
import { NotificationHandler } from '@/backend/notifications';
import { scan } from '@/backend/scan';

SplashScreen.preventAutoHideAsync();

export default function ClientHome() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { scanForDevices, stopScan } = useBLE();

  if (!fontsLoaded) {
    return null;
  }

  const updateNotificationHandler = (enabled: boolean) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: enabled,
        shouldPlaySound: enabled,
        shouldSetBadge: false,
      }),
    });
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    updateNotificationHandler(newState);
    console.log(`Notifications ${newState ? 'activées' : 'désactivées'}`);
  };

  const startScan = async () => {
    const device = await scanForDevices();
    if (device) {
      console.log('Scanné :', device.name);
      const ads = await scan(device.id);
      console.log('Publicité trouvée :', ads);
      await NotificationHandler({
        title: 'Promotion détectée !',
        body: ads.notification,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      startScan();
      return () => {
        console.log('Arrêt du scan BLE et réinitialisation.');
        stopScan();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <PulsatingIcon
        IconComponent={Ionicons}
        iconName="search"
        iconSize={150}
        iconColor="#FFFFFF"
        circleSize={200}
        circleColor="#2A9BE2"
        animationDuration={1200}
      />
      <Text style={styles.title}>Recherche activée</Text>
      <Text style={styles.description}>
        Promenez-vous dans la rue et recevez en temps réel des offres personnalisées des commerces autour de vous.
      </Text>
      <Text style={styles.note}>Restez à l&apos;affût, les bonnes affaires sont juste à côté !</Text>

      <CustomButton
        title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
        onPress={toggleNotifications}
        backgroundColor={notificationsEnabled ? '#0E3D60' : '#2A9BE2'}
        textColor="#FFFFFF"
        IconComponent={Ionicons}
        iconName={notificationsEnabled ? 'notifications-off' : 'notifications'}
        iconSize={20}
        iconColor="#FFFFFF"
        style={{
          paddingVertical: 15,
          paddingHorizontal: 30,
          bottom: 20,
          position: 'absolute',
        }}
        textStyle={{ fontSize: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: '#0E3D60',
    fontSize: 35,
    fontFamily: 'MontserratExtraBold',
    marginBottom: 10,
    marginTop: 100,
    textAlign: 'center',
  },
  description: {
    color: '#0E3D60',
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  note: {
    color: '#0E3D60',
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
});
