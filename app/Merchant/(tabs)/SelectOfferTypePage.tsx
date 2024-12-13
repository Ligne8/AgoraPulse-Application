import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import ReturnButton from '@/components/ReturnButton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { UnknownInputParams, useRouter } from 'expo-router';
import { ModalButton } from '@/components/ModalButton';
import { Modal } from '@/components/Modal';
import OfferForm from '@/components/OfferForm';
import { FormData } from '@/components/OfferForm';
import fetchAiInformation, { constructRequest } from '@/backend/openai';
import { getStore, Store } from '@/backend/client';
import Loader from '@/components/AILoader';

interface AnnouncementTypeProps {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  borderColor: string;
  onPress: () => void;
}

// const AIMockData: AIInformation =
//   {
//     'success': 'true',
//     'ad_type': 'special',
//     'response': 'Titre :\n"Mashallah" chez La pizza de la MaMa, ne manquez pas!\n\nNotification :\nEnvie de magie culinaire? Rejoignez-nous pour \'Mashallah\' chez La pizza de la MaMa avant le 11/02/2025 ! Un événement à ne pas manquer.\n\nDescription :\n"Mashallah" chez La pizza de la MaMa est une célébration de l\'art culinaire de la pizza comme aucune autre. Venez découvrir les secrets de la confection de nos pizzas qui vous laisseront dire ‘Mashallah’! Du choix des meilleurs ingrédients, à la préparation de la pâte fait maison, jusqu’à l’art du garnissage et de la cuisson, nous vous invitions à un voyage gustatif que vous n’oublierez pas de sitôt. \n\nL’événement commence maintenant et se poursuit jusqu\'au 11/02/2025. Durant cette période, nous aurons des démonstrations de cuisine en direct, des dégustations, ainsi que des promotions spéciales pour ceux qui participent à l\'événement. \n\nNos portes sont ouvertes à tous ceux qui souhaitent savourer la véritable essence de la pizza, et nous sommes impatients de vous accueillir chez La pizza de la MaMa. Venez nombreux pour profiter de cette expérience unique et palpitante. Ne ratez pas l\'opportunité de dire \'Mashallah\', Joignez-vous à nous!\n',
//     'title': 'Mashallah',
//     'description': 'Mashallah',
//     'notification': 'Envie de magie culinaire? Rejoignez-nous pour \'Mashallah\' chez La pizza de la MaMa avant le 11/02/2025 ! Un événement à ne pas manquer.',
//     'prompt': 'Tu es un expert en création de notifications publicitaires pour une application mobile dédiée aux petits commerces. Ta tâche consiste à générer une réponse claire et formatée qui incluent toujours les trois éléments suivants, dans cet ordre :\nTitre : Une phrase concise et accrocheuse sur \'Mashallah\' chez La pizza de la MaMa, limitée à 50 caractères.\nNotification : Un texte engageant et motivant (150 caractères maximum) qui incite les passants à participer à l’événement. Mentionne la date maximale de l\'evenement qui est lev11/02/2025 et utilise un appel à l’action direct comme \'Rejoignez-nous pour \'Mashallah\' avant le 11/02/2025 !\'.\nDescription détaillée : Une description détaillée (1500 caractères maximum) qui explique ce qu’est l’événement, ses activités, et donne toutes les informations pratiques (date, lieu, offres spéciales liées à l\'événement), tout en encourageant les passants à participer.*La structure de la réponse doit toujours suivre ce format :*\n\nTitre :\n[texte du titre]\n\nNotification :\n[texte de la notification push]\n\nDescription :\n[texte de la description]',
//     'image_url': encodeURI('https://oaidalleapiprodscus.blob.core.windows.net/private/org-FPkYJbXsTMY3CAER8PLdLeG9/ligne8-service-account/img-qxvVhi8MZ43apUOEueAIf4La.png?st=2024-12-10T11%3A41%3A02Z&se=2024-12-10T13%3A41%3A02Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-12-10T08%3A49%3A41Z&ske=2024-12-11T08%3A49%3A41Z&sks=b&skv=2024-08-04&sig=6BGISi4IHwDqvHgHkl679K6gpvQT2bHgHgUHv5rP9%2Bo%3D')
//   };

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState('');

  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  const displayOfferType = (type: string) => {
    if (type === 'reduction') {
      return 'Créer une offre de réduction';
    } else if (type === 'special') {
      return 'Créer une offre spéciale';
    }
  };

  const handleOfferType = async (type: string) => {
    setType(type);
    setModalOpen(true);
    console.log(type);
  };

  const validateType = (type: string) => {
    return type === 'reduction' || type === 'special';
  };
  const fetchStoreInformation = async (): Promise<Store | undefined> => {
    const res = await getStore();
    if (res == null) {
      console.error('Error fetching store information');
      return;
    }
    console.log('Store Information:');
    console.log(res);
    return res;
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (!validateType(type)) {
      console.error('Invalid offer type');
      return;
    }
    setModalOpen(false);
    setLoading(true);

    const store = await fetchStoreInformation();
    if (store === undefined) {
      console.error('Error fetching store information');
      setLoading(false);
      return;
    }
    const payload = await constructRequest(type, formData, store);
    const res = await fetchAiInformation(payload);
    if (res == null) {
      console.error('Error fetching AI information');
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push({
      pathname: '/Merchant/pages/CreateOfferPage',
      params: res as unknown as UnknownInputParams,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loader text="En attente de la génération par IA..." />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <ReturnButton />
          <ScrollView>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30,
                marginBottom: 20,
                marginTop: 100,
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
                justifyContent: 'center',
                paddingHorizontal: 25,
                width: '100%',
              }}
            >
              <AnnouncementType
                icon={<FontAwesome name="tag" size={50} color="#ff5848" />}
                label="Offre promotionnelle"
                bgColor="#ffeeed"
                borderColor="#ff5848"
                onPress={() => {}}
              />
              <AnnouncementType
                icon={<FontAwesome name="percent" size={50} color="#e5354b" />}
                label="Code de réduction"
                bgColor="#fcebed"
                borderColor="#e5354b"
                onPress={() => {
                  console.log('Code de réduction selected');
                  handleOfferType('reduction');
                }}
              />
              <AnnouncementType
                icon={<Entypo name="new" size={50} color="#f9a232" />}
                label="Informations sur les nouveautés"
                bgColor="#fef6ea"
                borderColor="#f9a232"
                onPress={() => {}}
              />
              <AnnouncementType
                icon={<FontAwesome name="bolt" size={50} color="#f04760" />}
                label="Ventes flash"
                bgColor="#fdedef"
                borderColor="#f04760"
                onPress={() => {}}
              />
              <AnnouncementType
                icon={<MaterialIcons name="work" size={60} color="#5490f9" />}
                label="Offre d'embauche"
                bgColor="#eef4fe"
                borderColor="#5490f9"
                onPress={() => {}}
              />
              <AnnouncementType
                icon={<FontAwesome name="shopping-bag" size={50} color="#d476e2" />}
                label="Ouverture de magasin"
                bgColor="#fbf1fc"
                borderColor="#d476e2"
                onPress={() => {}}
              />
              <AnnouncementType
                icon={<FontAwesome name="calendar" size={50} color="#0ed290" />}
                label="Évènement spécial"
                bgColor="#e7faf4"
                borderColor="#0ed290"
                onPress={() => {
                  console.log('Évènement spécial selected');
                  handleOfferType('special');
                }}
              />
              <AnnouncementType
                icon={<FontAwesome name="ellipsis-h" size={50} color="#888888" />}
                label="Autre"
                bgColor="#f3f3f3"
                borderColor="#888888"
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </View>
      )}
      <Modal isOpen={modalOpen}>
        <View className="bg-white w-full p-5 rounded-xl items-center shadow-md shadow-black/20">
          <Text className="text-[#0E3D60] text-[23px] text-center font-bold mb-2 w-full">{displayOfferType(type)}</Text>
          <View className="flex justify-center w-full mt-2">
            <View>
              <OfferForm type={type} onSubmit={handleFormSubmit} />
            </View>
            <View>
              <ModalButton
                title="Annuler"
                onPress={() => setModalOpen(false)}
                backgroundColor="#D9D9D9"
                textColor="#0E3D60"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectOfferTypePage;
