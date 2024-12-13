import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CustomButton from '@/components/CustomButton';
import EntryField from '@/components/EntryField';
import { faGlobe, faLock, faMapMarkerAlt, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAllStandalonTags, getStore, getTagsFromId, getUserData, Tag, updateStore } from '@/backend/client';
import EntryFieldDefaultValue from '@/components/EntryFieldDefaultValue';
import DisconnectButton from '@/components/DisconnectButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CustomPicker, { Item } from '@/components/CustomPicker';
import ToastComponent from '@/components/ToastComponent';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function ProfilePage() {
  const [password, setPassword] = React.useState('');
  // eslint-disable-next-line
  const [newPassword, setNewPassword] = React.useState('');

  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [storeName, setStoreName] = React.useState('');
  const [storeDescription, setStoreDescription] = React.useState('');
  const [commercerWebsite, setCommerceWebsite] = useState('');
  const [commercerAddress, setCommerceAddress] = useState('');
  const [commercerCity, setCommerceCity] = useState('');
  const [commercerZipCode, setCommerceZipCode] = useState('');
  // eslint-disable-next-line
  const [commercerType, setCommerceType] = useState('');
  // eslint-disable-next-line
  const [tags, setTags] = useState<Item[]>([]);

  // eslint-disable-next-line
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

  const fetchUserData = async () => {
    try {
      const user: any = await getUserData();
      setFirstname(user.firstname);
      setLastname(user.lastname);
    } catch {
      console.error('Error fetching user data');
    }
  };

  const fetchStore = async () => {
    try {
      const store = await getStore();
      const tags = await getTagsFromId(store.tag_id);
      setCommerceType(tags[0].id);
      setCommerceWebsite(store.web_url);
      setCommerceAddress(store.address);
      setCommerceCity(store.city);
      setCommerceZipCode(store.zip_code);
      setStoreName(store.name);
      setStoreDescription(store.description);
    } catch {
      console.error('Error fetching store information');
    }
  };

  useEffect(() => {
    fetchUserData().then(() => fetchStore().then(() => fetchTags()));
  }, []);

  useEffect(() => {}, [password]);

  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleSave = async () => {
    const store: any = {
      description: storeDescription,
      name: storeName,
      web_url: commercerWebsite,
      address: commercerAddress,
      city: commercerCity,
      zip_code: commercerZipCode,
    };
    try {
      console.log(store);
      await updateStore(store);
      showToast();
    } catch {
      console.error('Error saving store information');
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Les informations ont été mises à jour',
      text2: 'Succès ! 🎉',
    });
  };

  return (
    <KeyboardAvoidingView className="h-full w-full" behavior="height">
      <ScrollView>
        <View className="h-full w-full mt-10">
          <View className="flex-col justify-center align-middle mt-10 mb-5 ml-5 mr-5">
            <Text className="text-center text-4xl text-[#0E3D60] font-extrabold pb-2">Votre profil</Text>
            <Text className="text-center text-[#0E3D60]">
              Mettez à jour vos informations pour une expérience encore plus personnalisée.
            </Text>
          </View>
          <View className="flex-col justify-center items-center mt-5 ml-5 mr-5">
            <EntryFieldDefaultValue
              icon={faUser}
              title="Prénom"
              placeholder="Prénom"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
            />
            <EntryFieldDefaultValue
              icon={faUser}
              title="Nom"
              placeholder="Nom"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
            <EntryField
              icon={faLock}
              title="Mot de passe"
              onChangeText={(text) => setPassword(text)}
              placeholder="**********"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
            />
            {/* Fixed-height container for the conditional field */}
            <View>
              {password !== '' && password.length > 0 && (
                <EntryField
                  icon={faLock}
                  title="Confirmer le mot de passe"
                  onChangeText={(text) => setNewPassword(text)}
                  placeholder="**********"
                  backgroundColor="#EEEEEE"
                  descriptionColor="#6c7a93"
                  marginBottom={10}
                />
              )}
            </View>
          </View>
          <View className="flex-col justify-center align-middle">
            <Text className="text-center text-2xl text-[#0E3D60] font-extrabold ">Information principales</Text>
          </View>
          <View className="flex-col justify-center items-center mt-5 ml-5 mr-5">
            <EntryFieldDefaultValue
              icon={faUser}
              title="Nom du commerce"
              placeholder="XXX"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              value={storeName}
              onChangeText={(text) => setStoreName(text)}
            />
            <EntryFieldDefaultValue
              icon={faShop}
              title="Description"
              placeholder="Nom"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              multiline={true}
              value={storeDescription}
              onChangeText={(text) => setStoreDescription(text)}
            />
            <CustomPicker
              title="Sélectionner un type"
              items={tags}
              backgroundColor="#f2f2f2"
              textColor="#0E3D60"
              iconColor="#0E3D60"
              selectedItemColor="#1A3D5D"
              onValueChange={(value) => setCommerceType(value)}
              value={commercerType}
            />
          </View>

          <View className="flex-col justify-center align-middle">
            <Text className="text-center text-2xl text-[#0E3D60] font-extrabold ">Autres informations</Text>
          </View>
          <View className="flex-col justify-center items-center mt-5 ml-5 mr-5">
            <EntryFieldDefaultValue
              icon={faGlobe}
              title="Site Internet"
              placeholder="XXX"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              value={commercerWebsite}
              onChangeText={(text) => setCommerceWebsite(text)}
            />
            <View style={styles.addressContainer}>
              <View style={styles.addressLabel}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color="#0E3D60" />
                <Text style={styles.labelText}>Adresse</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Numéro de voie et rue"
                placeholderTextColor="#6c7a93"
                value={commercerAddress}
                onChangeText={(text) => setCommerceAddress(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Code postal"
                placeholderTextColor="#6c7a93"
                keyboardType="numeric"
                value={commercerZipCode}
                onChangeText={(text) => setCommerceZipCode(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Ville"
                placeholderTextColor="#6c7a93"
                value={commercerCity}
                onChangeText={(text) => setCommerceCity(text)}
              />
            </View>
          </View>

          <View className="flex-col justify-center items-center ">
            <CustomButton
              title="Enregistrer"
              onPress={() => handleSave()}
              backgroundColor="#0E3D60"
              textColor="#FFFFFF"
              width="100%"
              marginBottom={0}
            />
          </View>
          <View className="flex-col justify-center items-center">
            <DisconnectButton></DisconnectButton>
          </View>
        </View>
      </ScrollView>
      <ToastComponent />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
  },
  addressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E3D60',
    marginLeft: 5,
  },
  input: {
    height: 40,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Montserrat',
    paddingLeft: 10,
    fontSize: 14,
    color: '#6c7a93',
    marginBottom: 5,
    backgroundColor: '#ffffff',
  },
});
