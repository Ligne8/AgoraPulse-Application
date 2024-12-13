import { Text, TouchableOpacity, View, Image, ScrollView, Modal, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { getClientOffers } from '@/backend/client';
import { router, useFocusEffect } from 'expo-router';
import { getStoreById, scan } from '@/backend/scan';

interface Offer {
  title: string;
  picture_url: string;
  description: string;
  code: string;
  store_name: string;
  store_city: string;
  zip_code: string;
  store_address: string;
}

function Offer({
  title,
  picture_url,
  onPress,
  code,
  store_city,
  store_name,
  zip_code,
}: Offer & { onPress: () => void }) {
  const onClick = () => {
    router.push({
      pathname: '/client/pages/OfferCodePage',
      params: { code },
    });
  };

  return (
    <View className="mb-[10px]">
      <TouchableOpacity
        onPress={onPress}
        className="justify-around items-start flex-row w-[332px] pt-2 h-[130px] border-[1px] border-[#CCCCCC] bg-[#EEEEEE] rounded-t-[10px]"
      >
        <Image className="w-[100px] h-[100px] rounded-[5px]" source={{ uri: picture_url }} />
        <View className="flex justify-start  flex-col h-full  pb-4  ">
          <Text className="text-[12px] text-[#0E3D60] mb-2 font-montserrat">
            {store_name} - {zip_code} {store_city}
          </Text>
          <Text className="text-[18px] text-[#0E3D60] font-montserrat-semi-bold w-[202px]">
            {title.length < 58 ? `${title}` : `${title.substring(0, 58)}...`}
          </Text>
        </View>
      </TouchableOpacity>

      <View className="rounded-b-[10px] bg-[#0E3D60] ">
        <TouchableOpacity onPress={onClick} className="flex-row justify-center items-center h-[30px] ">
          <FontAwesome name="qrcode" size={20} color="white" />
          <Text className="ml-3 rounded-b-[1px] bg-[#0E3D60] text-white font-montserrat-bold text-[14px]">
            Voir le code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OfferModal({
  visible,
  onClose,
  offer,
  code,
}: {
  visible: boolean;
  onClose: () => void;
  offer: Offer | null;
  code: string | null;
}) {
  if (!offer) return null;

  const onClick = () => {
    router.push({
      pathname: '/client/pages/OfferCodePage',
      params: { code },
    });
    onClose();
  };
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}
        onPress={onClose}
        className="relative -z-10 bg-orange-800 "
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: 350,
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'absolute',
            zIndex: 10,
          }}
        >
          <View className="full mx-8 relative z-100">
            <Image
              className="w-[100px] h-[100px] absolute rounded -top-[76px] z-100"
              source={{ uri: offer.picture_url }}
            />
            <Text className="text-[18px] text-[#0E3D60] font-montserrat-semi-bold mt-10">{offer.title}</Text>
            <Text className="text-[14px] text-[#0E3D60]  mt-6 font-montserrat">{offer.description}</Text>
            <View className="justify-center items-center">
              <Text className="text-[14px] text-[#0E3D60] font-montserrat-semi-bold text-center mt-6">
                {offer.store_name}
              </Text>
              <Text className="text-[12px] text-[#0E3D60] text-center mt-[1px] font-montserrat">
                {offer.store_address}
              </Text>
              <Text className="text-[12px] text-[#0E3D60] text-center mb-6 font-montserrat">
                {offer.zip_code} {offer.store_city}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClick}
            className="bg-[#0E3D60] w-[184px] mx-auto rounded-3xl h-[40px] flex-row justify-center items-center mb-5"
          >
            <FontAwesome name="qrcode" size={20} color="white" />
            <Text className="ml-3 rounded-b-[1px] bg-[#0E3D60] text-white font-bold text-[14px]">Voir le code</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function OfferPage() {
  const [offers, setOffers] = useState<Offer[]>([
    {
      title: 'Profitez de -25% sur votre prochain achat.',
      picture_url: 'https://www.toutelasignaletique.com/23574-large_default/plaque-publicite-vache-qui-rit.jpg',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      code: 'CODE4',
      store_name: 'La vache qui rit',
      store_city: 'Paris',
      zip_code: '75001',
      store_address: '1 rue du fromage',
    },
  ]);

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOffer(null);
  };

  const fetchOffers = async () => {
    try {
      const offers = await getClientOffers();
      // eslint-disable-next-line
      let formatedOffers: Offer[] = [];
      if (offers) {
        const formatedOffers: Offer[] = [];
        for (const offer of offers) {
          // @ts-expect-error tqt mon gourmand
          const store = await getStoreById(offer.Ads.store_id);
          formatedOffers.push({
            // @ts-expect-error tqt mon gourmand
            title: offer.Ads.title,
            // @ts-expect-error tqt mon gourmand
            picture_url: offer.Ads.image_url,
            // @ts-expect-error tqt mon gourmand
            description: offer.Ads.description,
            code: offer.code,
            store_name: store.name,
            store_city: store.city,
            zip_code: store.zip_code,
            store_address: store.address,
          });
        }
        setOffers(formatedOffers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOffers();
    }, [])
  );

  const simulateScanning = async () => {
    await scan('CD051DF7-FEA7-FBD5-BA28-A67FD30A1F9D');
    fetchOffers();
  };

  return (
    <View className="h-full flex-col w-full justify-center items-center">
      <View className="justify-center items-center px-[30px] mb-[20px] ">
        <TouchableOpacity onPress={simulateScanning}>
          <Text className="text-[36px] font-montserrat-extra-bold text-[#0E3D60] mb-6">Vos offres exclusives</Text>
        </TouchableOpacity>
        <Text className="text-center text-[#0E3D60] text-[16px] font-montserrat">
          Découvrez les promotions des commerces que vous avez rencontrés aujourd&apos;hui. Profitez-en avant
          qu&apos;elles ne disparaissent !
        </Text>
      </View>
      <View className="h-[450px]">
        <ScrollView className=" " showsVerticalScrollIndicator={false}>
          {offers.map((offer, index) => (
            <Offer
              key={index}
              title={offer.title}
              picture_url={offer.picture_url}
              description={offer.description}
              code={offer.code}
              store_name={offer.store_name}
              store_city={offer.store_city}
              zip_code={offer.zip_code}
              store_address={offer.store_address}
              onPress={() => openModal(offer)}
            />
          ))}
        </ScrollView>
      </View>
      <OfferModal visible={isModalVisible} onClose={closeModal} offer={selectedOffer} code={selectedOffer?.code} />
    </View>
  );
}
