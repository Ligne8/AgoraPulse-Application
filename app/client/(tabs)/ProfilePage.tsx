import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CustomButton from '@/components/CustomButton';
import { TagsSelector } from '@/components/tagsSelector';
import EntryField from '@/components/EntryField';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

SplashScreen.preventAutoHideAsync();

export default function ProfilePage() {
  const [tags, setTags] = React.useState([
    { id: 1, name: 'Gastronomie', selected: false },
    { id: 2, name: 'Bien-être', selected: false },
    { id: 3, name: 'Sport', selected: false },
    { id: 4, name: 'Culture', selected: false },
    { id: 5, name: 'Sorties', selected: false },
  ]);
  const [oldPassword, setOldPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  useEffect(() => {
    // FIXME : fetch user information and set Password to the user password
    setOldPassword('');
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
  const handleSave = () => {
    if (password !== newPassword) {
      console.error('Passwords do not match');
    } else if (password === oldPassword) {
      console.error('cannot use the same password');
    } else if (password.length < 6) {
      console.error('password too short, should be at least 6 characters');
    }
    const selectedTags = tags.filter((tag) => tag.selected);
    if (selectedTags.length < 3) {
      console.error('Select at least 3 tags');
    }
    console.log('Success ! ');
    // FIXME: Save the user information
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
        <EntryField
          icon={faUser}
          title="Prénom"
          placeholder="Prénom"
          backgroundColor="#EEEEEE"
          descriptionColor="#6c7a93"
          marginBottom={10}
        />
        <EntryField
          icon={faUser}
          title="Nom"
          placeholder="Nom"
          backgroundColor="#EEEEEE"
          descriptionColor="#6c7a93"
          marginBottom={10}
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
        <View
          style={{
            display: password !== '' && password.length > 0 && oldPassword !== password ? 'flex' : 'none',
            width: '100%',
          }}
        >
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
