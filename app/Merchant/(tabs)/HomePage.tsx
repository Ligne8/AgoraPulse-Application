import { getAchievements, getAds } from '@/backend/client';
import { getNbAdsByStoreId, getNbNotificationSendByStoreId } from '@/backend/info-firmware';
import useBLE from '@/components/BLEScanner';
import { useFonts } from 'expo-font';
import { SplashScreen, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { View, Text } from 'react-native';

interface Ad {
  id: string;
  title: string;
  points: number;
  image_url: string;
}

interface Achievement {
  id: string;
  title: string;
  points: string;
  description: string;
}

export default async function HomePage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  const [showAllAnnonces, setShowAllAnnonces] = useState(false);
  const [showAllOffres, setShowAllOffres] = useState(false);
  const [annonces, setAds] = useState<Ad[]>([]);
  const [offresFidelite, setAchievements] = useState<Achievement[]>([]);

  const fetchAds = async () => {
    const ads: any = await getAds();
    setAds(ads);
  };

  const fetchAchievements = async () => {
    const achievements: any = await getAchievements();
    setAchievements(achievements);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAds();
      fetchAchievements();
    }, [])
  );

  const nbNotif = await getNbNotificationSendByStoreId('CD051DF7-FEA7-FBD5-BA28-A67FD30A1F9D');
  const nbAds = await getNbAdsByStoreId('CD051DF7-FEA7-FBD5-BA28-A67FD30A1F9D');
  const { SendMessageToDevice } = useBLE();
  const messageNotif = 'CLIENTS:' + nbNotif;
  const messageAds = 'ADS:' + nbAds;
  SendMessageToDevice(messageNotif);
  SendMessageToDevice(messageAds);

  useEffect(() => {
    
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('@/assets/images/logo.png')} />
        <Text style={styles.title}>Votre espace commerçant</Text>
        <Text style={styles.subtitle}>
          Gérez vos annonces et vos offres de fidélité pour engager votre clientèle de proximité.
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vos annonces actives</Text>
          <Text style={styles.sectionSubtitle}>Attirez les clients de passage avec vos promotions en cours.</Text>

          {(showAllAnnonces ? annonces : annonces.slice(0, 1)).map((annonce) => (
            <View key={annonce.id} style={styles.offerBox}>
              <Image style={styles.offerImage} source={{ uri: annonce.image_url }} />
              <Text style={styles.offerText}>{annonce.title}</Text>
              <Text style={styles.offerPoints}>{annonce.points} pts</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={() => setShowAllAnnonces(!showAllAnnonces)}>
            <Text style={styles.buttonText}>{showAllAnnonces ? 'Voir moins' : 'Voir plus'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vos offres de fidélité</Text>
          <Text style={styles.sectionSubtitle}>Fidélisez vos clients en leur offrant des avantages exclusifs.</Text>

          {(showAllOffres ? offresFidelite : offresFidelite.slice(0, 1)).map((offre, index) => (
            <View key={index} style={styles.rewardBox}>
              <Text style={styles.rewardPoints}>{offre.title}</Text>
              <Text style={styles.rewardText}>{offre.description}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={() => setShowAllOffres(!showAllOffres)}>
            <Text style={styles.buttonText}>{showAllOffres ? 'Voir moins' : 'Voir plus'}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white', // Bloc blanc
            height: 120, // Taille ajustable
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 125,
    height: 125,
    marginBottom: 0,
  },
  title: {
    fontFamily: 'MontserratExtraBold',
    fontSize: 36,
    color: '#0E3D60',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#0E3D60',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  section: {
    width: '90%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: '#0E3D60',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#0E3D60',
    textAlign: 'left',
    marginBottom: 15,
  },
  offerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  offerImage: {
    width: 75,
    height: 75,
    marginRight: 10,
    borderRadius: 5,
  },
  offerText: {
    flex: 1,
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#0E3D60',
  },
  offerPoints: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    color: '#0E3D60',
  },
  rewardBox: {
    backgroundColor: '#e0f7ff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  rewardPoints: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#0E3D60',
    marginBottom: 5,
    textAlign: 'left',
  },
  rewardText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#0E3D60',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#0E3D60',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
