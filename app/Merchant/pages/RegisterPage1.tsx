import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { faShop, faNavicon, faGlobe } from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';
import CustomPicker, { Item } from '@/components/CustomPicker';
import AddressField from '@/components/AddressFields';
import { router } from 'expo-router';
import { createStore, getAllStandalonTags, getStore, Store, Tag } from '@/backend/client';

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    MontserratBlack: require('@/assets/fonts/Montserrat-Black.ttf'),
  });

  const [commercerName, setCommerceName] = useState('');
  const [commercerDescription, setCommerceDescription] = useState('');
  const [commercerType, setCommerceType] = useState('');
  const [commercerWebsite, setCommerceWebsite] = useState('');
  const [commercerAddress, setCommerceAddress] = useState('');
  const [commercerCity, setCommerceCity] = useState('');
  const [commercerZipCode, setCommerceZipCode] = useState('');
  const [tags, setTags] = useState<Item[]>([]);

  const fetchTags = async () => {
    try {
      const tags = await getAllStandalonTags();
      const items: Item[] = tags
        .map((tag: Tag) => ({ label: tag.name, value: tag.id }))
        .sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));

      setTags(items);
    } catch (error) {
      console.log(error);
    }
  };

  const isStoreExist = async () => {
    try {
      const store = await getStore();
      if (store != undefined) {
        router.push('/Merchant/pages/RegisterPage2');
      } else {
        fetchTags();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isStoreExist();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleNextPress = async () => {
    if (!commercerName || !commercerDescription || !commercerType) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (!commercerAddress || !commercerCity || !commercerZipCode) {
      // eslint-disable-next-line
      alert("Veuillez remplir tous les champs de l'adresse");
      return;
    }
    const payload: Store = {
      name: commercerName,
      description: commercerDescription,
      tag_id: commercerType,
      web_url: commercerWebsite,
      city: commercerCity,
      zip_code: commercerZipCode,
      address: commercerAddress,
    };
    try {
      await createStore(payload);
      alert('Votre commerce a été enregistré avec succès');
      router.push('/Merchant/pages/RegisterPage2');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView className="bg-white">
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60}>
        <View className="flex-1 bg-white justify-center items-center px-8">
          <Text className="font-montserrat-extra-bold text-[37px] mt-16 mb-5 text-[#0E3D60] align-middle text-center">
            Complétez votre profil
          </Text>
          <Text className="text-[#0E3D60] text-[14px] font-montserrat text-center mb-8">
            Ajoutez les informations sur votre commerce afin que vos clients vous trouvent facilement.
          </Text>
          <Text className="text-[#0E3D60] text-[20px] font-montserrat-extra-bold text-center mb-1">
            Informations principales
          </Text>
          <EntryField
            icon={faShop}
            title="Nom du commerce"
            placeholder="Entrez le nom de votre commerce"
            backgroundColor="#f2f2f2"
            descriptionColor="#6c7a93"
            marginBottom={10}
            onChangeText={(text) => setCommerceName(text)}
          />
          <EntryField
            icon={faNavicon}
            title="Description"
            placeholder="Présenter brièvement votre commerce"
            backgroundColor="#f2f2f2"
            descriptionColor="#6c7a93"
            multiline={true}
            marginBottom={10}
            onChangeText={(text) => setCommerceDescription(text)}
            inputHeight={100}
          />
          <CustomPicker
            title="Sélectionner un type"
            items={tags}
            backgroundColor="#f2f2f2"
            textColor="#0E3D60"
            iconColor="#0E3D60"
            selectedItemColor="#1A3D5D"
            onValueChange={(value) => setCommerceType(value)}
          />
          <Text className="text-[#0E3D60] text-[20px] font-montserrat-extra-bold text-center mb-1 mt-5">
            Autres informations
          </Text>
          <EntryField
            icon={faGlobe}
            title="Site internet"
            placeholder="Entrez l'adresse de votre site internet"
            backgroundColor="#f2f2f2"
            descriptionColor="#6c7a93"
            marginBottom={10}
            onChangeText={(text) => setCommerceWebsite(text)}
          />
          <AddressField
            onChangeAddress={setCommerceAddress}
            onChangeCity={setCommerceCity}
            onChangeZipCode={setCommerceZipCode}
          />
          <CustomButton
            title="Suivant"
            onPress={handleNextPress}
            backgroundColor="#0E3D60"
            textColor="#FFFFFF"
            width="100%"
            marginBottom={0}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
