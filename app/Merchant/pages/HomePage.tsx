import { Offer } from '@/app/client/(tabs)/OfferPage';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

export default function HomePage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View className="w-full h-full mt-14">
      <View className="justify-center items-center">
        <Image className="w-[125px] h-[125px] mb-[25px]" source={require('@/assets/images/logo.png')} />
        <Text style={styles.text} className="text-center text-[36px] font-bold text-[#0E3D60] mb-6">
          Votre espace commerçant
        </Text>
        <Text style={styles.text} className="text-center text-[16px] text-[#0E3D60] px-6">
          Gérez vos annonces et vos offres de fidélité pour engager votre clientèle de proximité.
        </Text>
      </View>
      <View className="justify-center items-center">
        <Offer
          code="aaaaa"
          title="Prof"
          picture_url="https://images.affiches-et-posters.com//albums/3/55722/medium/affiche-vintage-perrier-villemot-7411.jpg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
  },
});
