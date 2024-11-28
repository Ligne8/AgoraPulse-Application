import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { faShop, faNavicon, faGlobe } from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';
import CustomPicker, { Item } from '@/components/CustomPicker';
import AddressField from '@/components/AddressFields';
import { router } from 'expo-router';
import { createStore, getAllStandalonTags, Store, Tag } from '@/backend/client';

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
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
      const items: Item[] = tags.map((tag: Tag) => ({ label: tag.name, value: tag.id }));
      setTags(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTags();
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
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Complétez votre profil</Text>
      <Text style={styles.description}>
        Ajoutez les informations sur votre commerce afin que vos clients vous trouvent facilement.
      </Text>
      <Text style={styles.sectionTitle}>Informations principales</Text>
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
      <Text style={styles.sectionTitle}>Autres informations</Text>
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
    fontSize: 37,
    fontFamily: 'MontserratExtraBolt',
    marginBottom: 5,
    marginTop: 40,
  },
  description: {
    color: '#0E3D60',
    fontSize: 14,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#0E3D60',
    fontSize: 20,
    fontFamily: 'MontserratBlack',
    textAlign: 'center',
    marginBottom: 5,
  },
});
