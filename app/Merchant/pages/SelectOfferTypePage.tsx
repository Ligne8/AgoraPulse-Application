import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ReturnButton from '@/components/ReturnButton';
import { useFonts } from 'expo-font';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as SplashScreen from 'expo-splash-screen';

import {
  faPercent,
  faTag,
  faBolt,
  faStore,
  faCalendarAlt,
  faBriefcase,
  faGift,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

interface AnnouncementTypeProps {
  icon: IconDefinition;
  label: string;
  bgColor: string;
  borderColor: string;
  onPress: () => void;
}

const AnnouncementType: React.FC<AnnouncementTypeProps> = ({ icon, label, bgColor, borderColor, onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 160,
      height: 130,
    }}
    onPress={onPress}
  >
    <FontAwesomeIcon icon={icon} size={50} color={borderColor} />
    <Text
      style={{
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 16,
        color: borderColor,
        marginTop: 10,
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const SelectOfferTypePage = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ReturnButton />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginBottom: 20,
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontFamily: 'MontserratExtraBolt',
            fontSize: 40,
            color: '#0E3D60',
            textAlign: 'center',
            marginBottom: 6,
          }}
        >
          Créer une annonce
        </Text>
        <Text style={{ fontFamily: 'Montserrat', fontSize: 16, color: '#0E3D60', textAlign: 'center' }}>
          Choisissez le type d&apos;annonce que vous souhaitez créer
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          width: '100%',
        }}
      >
        <AnnouncementType
          icon={faTag}
          label="Offre promotionnelle"
          bgColor="#ffeeed"
          borderColor="#ff5848"
          onPress={() => {}}
        />
        <AnnouncementType
          icon={faPercent}
          label="Code de réduction"
          bgColor="#fcebed"
          borderColor="#e5354b"
          onPress={() => {}}
        />
        <AnnouncementType
          icon={faGift}
          label="Informations sur les nouveautés"
          bgColor="#fef6ea"
          borderColor="#f9a232"
          onPress={() => {}}
        />
        <AnnouncementType
          icon={faBolt}
          label="Ventes flash"
          bgColor="#fdedef"
          borderColor="#f04760"
          onPress={() => {}}
        />
        <AnnouncementType
          icon={faBriefcase}
          label="Offre d'embauche"
          bgColor="#eef4fe"
          borderColor="#5490f9"
          onPress={() => {}}
        />
        <AnnouncementType
          icon={faStore}
          label="Ouverture de magasin"
          bgColor="#fbf1fc"
          borderColor="#d476e2"
          onPress={() => {}}
        />
        <AnnouncementType
          icon={faCalendarAlt}
          label="Évènement spécial"
          bgColor="#e7faf4"
          borderColor="#0ed290"
          onPress={() => {}}
        />
        <AnnouncementType icon={faEllipsisH} label="Autre" bgColor="#f3f3f3" borderColor="#888888" onPress={() => {}} />
      </View>
    </View>
  );
};

export default SelectOfferTypePage;
