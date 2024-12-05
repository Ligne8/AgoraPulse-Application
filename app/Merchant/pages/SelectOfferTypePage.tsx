import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import ReturnButton from '@/components/ReturnButton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { ModalButton } from '@/components/ModalButton';
import { Modal } from '@/components/Modal';
import OfferForm from '@/components/OfferForm';
import { FormData } from '@/components/OfferForm';


interface AnnouncementTypeProps {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  borderColor: string;
  onPress: () => void;
}

const AIMockData = {
  success: 'true',
  ad_type: 'special',
  data: 'Titre :\n"Promotion Flash, Petits Trésors chez Boutique des Curiosités!"\n\nNotification :\n"Poussée par une envie d’un shopping unique? Rejoignez-nous avant le 31/03/2022 pour notre Promotion Flash chez Boutique des Curiosités!"\n\nDescription :\n"La Boutique des Curiosités est fière de vous inviter à notre événement \'Promotion Flash, Petits Trésors\'! Préparez-vous à voyager dans des univers uniques allant de l\'artisanat d\'art, bijoux fantaisie aux produits de décoration d\'intérieur sur-mesure. \n\nL\'événement se déroulera le 31/03/2022 toute la journée, de 9h à 19h, au sein de notre boutique physique située au coeur de Paris. En participant, vous aurez la chance de découvrir une sélection de produits soigneusement choisis pour leur originalité et leur caractère unique. \n\nLors de cette journée spéciale, nous vous proposons des offres promotionnelles avec des réductions allant jusqu\'à -40% sur une grande sélection d\'articles. Une belle occasion pour dénicher vos futurs coups de coeur parmi une diversité de produits de petits artisans locaux. \n\nAlors, ne manquez pas cette opportunité d\'enchérir sur des trésors uniques à des prix imbattables, et de soutenir en même temps les petits commerces. \n\nVous êtes tous invités à cette journée spéciale. Nous avons hâte de vous accueillir pour une expérience de shopping unique. Le café et les rafraîchissements seront offerts toute la journée. Rendez-vous le 31/03/2022 chez Boutique des Curiosités !"',
  prompt:
    'Tu es un expert en création de notifications publicitaires pour une application mobile dédiée aux petits commerces. Ta tâche consiste à générer une réponse claire et formatée qui incluent toujours les trois éléments suivants, dans cet ordre :\nTitre : Une phrase concise et accrocheuse, par exemple \'Mashallah\' chez La pizza de la MaMa, limitée à 50 caractères.\nNotification : Un texte engageant et motivant (150 caractères maximum) qui incite les passants à participer à l’événement. Mentionne la date et l’heure, et utilise un appel à l’action direct comme \'Rejoignez-nous pour \'Mashallah\' avant le 11/02/2025 !\'.\nDescription détaillée : Une description détaillée (1500 caractères maximum) qui explique ce qu’est l’événement, ses activités, et donne toutes les informations pratiques (date, lieu, offres spéciales liées à l\'événement), tout en encourageant les passants à participer.*La structure de la réponse doit toujours suivre ce format :*\n\nTitre :\n[texte du titre]\n\nNotification :\n[texte de la notification push]\n\nDescription :\n[texte de la description]',
};

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

  const handleOfferType = async (type: string) => {
    setType(type);
    setModalOpen(true);
    console.log(type);
  };

  const handleFormSubmit = (formData: FormData ): void => {
    console.log('Form Data:', formData);
    setModalOpen(false);
    if (type === 'reduction') {
      setLoading(true);
      // FIXME: Call the create Object for the request

      // FIXME : Call the real API here
      console.log('Calling API...');
      // const res = await fetchAiInformation();
      // console.log(res);
      console.log('API call completed');
      setLoading(false);
      router.push({
        pathname: '/Merchant/pages/MerchantCreateOfferPage',
        params: AIMockData,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0E3D60" />
          <Text style={{ fontSize: 16, color: '#0E3D60', marginTop: 10 }}>Waiting for AI generation...</Text>
        </View>
      ) : (
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
        </View>
      )}
      <Modal isOpen={modalOpen}>
        <View className="bg-white w-full p-5 rounded-xl items-center shadow-md shadow-black/20">
          <Text className="text-[#0E3D60] text-[23px] text-center font-bold mb-2 w-full">
            Créer une offre de {type}
          </Text>
          <View className="flex justify-center w-full mt-2">
            <OfferForm type={type} onSubmit={handleFormSubmit} />
            <ModalButton
              title="Annuler"
              onPress={() => setModalOpen(false)}
              backgroundColor="#D9D9D9"
              textColor="#0E3D60"
            />
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default SelectOfferTypePage;
