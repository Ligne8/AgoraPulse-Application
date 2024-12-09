import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import ReturnButton from '@/components/ReturnButton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';

interface AnnouncementTypeProps {
  icon: React.ReactNode;
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
    {icon}
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <ReturnButton />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginBottom: 20,
          marginTop: 80,
        }}
      >
        <Text
          style={{
            fontFamily: 'MontserratExtraBold',
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
          icon={<FontAwesome name="tag" size={50} color="#ff5848" />}
          label="Offre promotionnelle"
          bgColor="#ffeeed"
          borderColor="#ff5848"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
        <AnnouncementType
          icon={<FontAwesome name="percent" size={50} color="#e5354b" />}
          label="Code de réduction"
          bgColor="#fcebed"
          borderColor="#e5354b"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
        <AnnouncementType
          icon={<Entypo name="new" size={50} color="#f9a232" />}
          label="Informations sur les nouveautés"
          bgColor="#fef6ea"
          borderColor="#f9a232"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
        <AnnouncementType
          icon={<FontAwesome name="bolt" size={50} color="#f04760" />}
          label="Ventes flash"
          bgColor="#fdedef"
          borderColor="#f04760"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
        <AnnouncementType
          icon={<MaterialIcons name="work" size={60} color="#5490f9" />}
          label="Offre d'embauche"
          bgColor="#eef4fe"
          borderColor="#5490f9"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
        <AnnouncementType
          icon={<FontAwesome name="shopping-bag" size={50} color="#d476e2" />}
          label="Ouverture de magasin"
          bgColor="#fbf1fc"
          borderColor="#d476e2"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
        <AnnouncementType
          icon={<FontAwesome name="calendar" size={50} color="#0ed290" />}
          label="Évènement spécial"
          bgColor="#e7faf4"
          borderColor="#0ed290"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
        <AnnouncementType
          icon={<FontAwesome name="ellipsis-h" size={50} color="#888888" />}
          label="Autre"
          bgColor="#f3f3f3"
          borderColor="#888888"
          onPress={() => router.push('/Merchant/pages/CreateOfferPage')}
        />
      </View>
    </View>
  );
};

export default SelectOfferTypePage;
