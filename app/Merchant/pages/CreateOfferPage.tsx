import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReturnButton from '@/components/ReturnButton';
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import EntryField from '@/components/EntryField';
import { faMinus, faPlus, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CustomButton from '@/components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { AIInformation } from '@/backend/openai';
import { useNavigation } from '@react-navigation/native';
import { Ads } from '@/backend/Interface/Ads';
import { createAd, getStore } from '@/backend/client';

const CreateOfferPage = () => {
  const [fidelityPoints, setFidelityPoints] = React.useState('0');
  // const router = useRouter();
  const numberRegExp = new RegExp('^[0-9]{0,4}$');

  const data = useLocalSearchParams();
  const [ad_type, setAdType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState('');
  const [image, setImage] = useState('');

  const handleChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleChangeDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleChangeNotification = (newNotification: string) => {
    setNotification(newNotification);
  };

  useEffect(() => {
    const aiInformation = data as unknown as AIInformation;
    setTitle(aiInformation.title);
    setDescription(aiInformation.description);
    setNotification(aiInformation.notification);
    console.log(aiInformation.image_url);
    setImage(aiInformation.image_url ?? '');
    setAdType(aiInformation.ad_type);
  }, []);

  const handleIncrement = () => {
    if (fidelityPoints === '') {
      setFidelityPoints('1');
      return;
    }
    const fidelityPointsInt = parseInt(fidelityPoints);
    if (fidelityPointsInt === undefined) return;
    setFidelityPoints((fidelityPointsInt + 1).toString());
  };
  const handleDecrement = () => {
    if (fidelityPoints === '') return;
    const fidelityPointsInt = parseInt(fidelityPoints);
    if (fidelityPointsInt === undefined) return;
    if (fidelityPointsInt <= 0) return;
    setFidelityPoints((fidelityPointsInt - 1).toString());
  };

  const handlePublication = async () => {
    const store = await getStore();
    const newAd: Ads = {
      ad_type: ad_type,
      title: title,
      description: description,
      notification: notification,
      points: parseInt(fidelityPoints),
      image_url: image,
      store_id: store.id,
    };
    console.log(newAd);
    await createAd(newAd);
    router.push('/Merchant/(tabs)/HomePage');
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  const handleInputChange = (text: string) => {
    console.log(text);
    console.log(isNaN(parseInt(text)));
    if (text.length > 4 || !numberRegExp.test(text)) return;
    setFidelityPoints(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding" // Adjust behavior to "height" or "position" as needed
      keyboardVerticalOffset={60} // Offset for avoiding keyboard overlap
    >
      <View className="flex flex-col h-full bg-[#FFFFFF]">
        <ReturnButton />
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            backgroundColor: 'white',
          }}
          keyboardShouldPersistTaps="handled" // Dismiss keyboard on tap
          showsVerticalScrollIndicator={false} // Optional: Hides scroll bar
        >
          <View className="flex justify-center items-center mt-20 p-3">
            <Text className="text-center text-5xl text-[#0E3D60] font-extrabold pb-2">Finaliser votre annonce</Text>
            <Text className="text-center text-[#0E3D60] w-3/4">

              Remplissez les détails de votre annonce avant de la publier
            </Text>
          </View>
          <View className="flex-col justify-center items-center mt-5 ml-5 mr-5">
            <EntryField
              icon={faUser}
              title="Titre de l'annonce"
              placeholder="Entrez un titre accrocheur pour votre annonce"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              inputHeight={50}
              marginBottom={10}
              value={title}
              onChangeText={handleChangeTitle}
              multiline={true}
            />
            <EntryField
              icon={faShoppingCart}
              title="Description"
              placeholder="Décrivez votre annonce de manière détaillée"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              inputHeight={100}
              marginBottom={10}
              value={description}
              onChangeText={handleChangeDescription}
              multiline={true}
            />
            <EntryField
              icon={faUser}
              title="Notification"
              placeholder="Entrez le message de notification à envoyer au client"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={5}
              inputHeight={50}
              multiline={true}
              value={notification}
              onChangeText={handleChangeNotification}
            />
            <Image className="w-full h-64 mt-5 rounded-lg" src={image} />
          </View>
          <View className="flex justify-center items-center p-4">
            <Text className="text-center text-2xl text-[#0E3D60] font-extrabold pb-2">Points de fidélité</Text>
            <Text className="text-center text-[#0E3D60]">
              Attribuez des points de fidélité pour inciter vos clients à profiter de cette annonce et renforcer leur
              fidélité !
            </Text>
            <View className="flex-row justify-around items-center w-full m-6">
              <TouchableOpacity onPress={handleDecrement} className="rounded border p-2 border-[#CCCCCC] bg-[#EEEEEE]">
                <FontAwesomeIcon icon={faMinus} size={20} color="#888888" />
              </TouchableOpacity>
              <TextInput
                onChangeText={handleInputChange}
                value={fidelityPoints}
                className="text-center text-3xl text-[#0E3D60] font-extrabold pb-2"
              />
              <TouchableOpacity onPress={handleIncrement} className="rounded border p-2 border-[#CCCCCC] bg-[#EEEEEE]">
                <FontAwesomeIcon icon={faPlus} size={20} color="#888888" />
              </TouchableOpacity>
            </View>
            <View className="flex-col justify-center items-center">
              <CustomButton
                title="Publier l'annonce"
                onPress={handlePublication}
                backgroundColor="#0E3D60"
                textColor="#FFFFFF"
                width="100%"
                marginBottom={0}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateOfferPage;
