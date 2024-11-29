import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CustomButton from '@/components/CustomButton';
import { TagsProps, TagsSelector } from '@/components/tagsSelector';
import EntryField from '@/components/EntryField';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAllTags, getUserData, saveUserTags, Tag } from '@/backend/client';
import EntryFieldDefaultValue from '@/components/EntryFieldDefaultValue';

SplashScreen.preventAutoHideAsync();

export default function ProfilePage() {
  const [tags, setTags] = React.useState([] as TagsProps[]);
  const [password, setPassword] = React.useState('');
  // eslint-disable-next-line
  const [newPassword, setNewPassword] = React.useState('');

  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');

  const fetchUserData = async () => {
    try {
      const user: any = await getUserData();
      setFirstname(user.firstname);
      setLastname(user.lastname);
    } catch {
      console.error('Error fetching user data');
    }
  };

  const fetchTags = async () => {
    try {
      const t = await getAllTags();
      setTags(t);
    } catch {
      console.error('Error fetching tags');
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchTags();
  }, []);

  useEffect(() => {
    console.log(password);
  }, [password]);

  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleSave = async () => {
    const selectedTags: Tag[] = tags
      .filter((tag) => tag.selected)
      .map((tag) => {
        const t: Tag = { id: tag.id, name: tag.name };
        return t;
      });
    if (selectedTags.length < 3) {
      alert('Veuillez sélectionner au moins 3 centres d’intérêt');
    }
    try {
      await saveUserTags(selectedTags);
      alert('Vos informations ont été mises à jour');
    } catch (e) {
      console.log(e);
      console.error('Error saving user tags');
    }
  };

  return (
    <View className="h-full w-full mt-10">
      <View className="flex-col justify-center align-middle mt-10 mb-5 ml-5 mr-5">
        <Text className="text-center text-4xl text-[#0E3D60] font-extrabold pb-2">Votre profil</Text>
        <Text className="text-center text-[#0E3D60]">
          Mettez à jour vos informations pour une expérience encore plus personnalisée.
        </Text>
      </View>
      <View className="flex-col justify-center items-center m-5">
        <EntryFieldDefaultValue
          icon={faUser}
          title="Prénom"
          placeholder="Prénom"
          backgroundColor="#EEEEEE"
          descriptionColor="#6c7a93"
          marginBottom={10}
          value={firstname}
        />
        <EntryFieldDefaultValue
          icon={faUser}
          title="Nom"
          placeholder="Nom"
          backgroundColor="#EEEEEE"
          descriptionColor="#6c7a93"
          marginBottom={10}
          value={lastname}
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
      <View className="flex p-2">
        <Text className="text-center text-4xl text-[#0E3D60] font-extrabold"> Vos préférences </Text>
        <Text className="text-center text-[#0E3D60] pb-3 "> Sélectionnez au moins 3 centres d’intérêt </Text>
        <TagsSelector tags={tags} setTags={setTags} />
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
    </View>
  );
}
