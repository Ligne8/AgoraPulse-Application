import { Text, TouchableOpacity, View, Image, ScrollView, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface Offer {
  title: string;
  picture_url: string;
  description: string;
  code: string;
}

function Offer({ title, picture_url, onPress }: Offer & { onPress: () => void }) {
  return (
    <View className="mb-[10px]">
      <TouchableOpacity
        onPress={onPress}
        className="justify-around items-center flex-row w-[332px] h-[120px] border-[1px] border-[#CCCCCC] bg-[#EEEEEE] rounded-t-[10px]"
        <Image className="w-[100px] h-[100px] rounded-[5px]" source={{ uri: picture_url }} />
        <Text className="text-[18px] text-[#0E3D60] font-semibold w-[202px]">{title}</Text>
      </TouchableOpacity>

      <View className="rounded-b-[10px] bg-[#0E3D60] ">
        <TouchableOpacity className="flex-row justify-center items-center h-[30px] ">
          <FontAwesome name="qrcode" size={20} color="white" />
          <Text className="ml-3 rounded-b-[1px] bg-[#0E3D60] text-white font-bold text-[14px]">Voir le code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OfferModal({ visible, onClose, offer }: { visible: boolean; onClose: () => void; offer: Offer | null }) {
  if (!offer) return null;
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: 350,
            backgroundColor: '#fff',
            borderRadius: 10,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#cccccc' }}>✕</Text>
          </TouchableOpacity>
          <View style={{ padding: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: offer.picture_url }}
              style={{ width: 100, height: 100, borderRadius: 5, marginRight: 10 }}
            />
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#0E3D60',
                flexShrink: 1,
              }}
            >
              {offer.title}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 30, paddingBottom: 15 }}>
            <Text
              style={{
                fontSize: 14,
                color: '#333',
                fontFamily: 'Montserrat',
              }}
            >
              {offer.description}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#0E3D60',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <FontAwesome name="qrcode" size={20} color="white" />
            <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8, fontFamily: 'Montserrat' }}>
              Voir le code
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function OfferPage() {
  const [offers] = useState<Offer[]>([
    {
      title: 'Profitez de -10% sur votre prochain pack de 24 canettes.',
      picture_url:
        'https://images.affiches-et-posters.com//albums/3/55722/medium/affiche-vintage-perrier-villemot-7411.jpg',
      description:
        'Découvrez les promotions des commerces que vous avez rencontrés aujourd hui. Profitez-en avant qu elles ne disparaissent !',
      code: 'CODE1',
    },
    {
      title: 'Profitez de -25% sur votre prochain achat.',
      picture_url: 'https://www.toutelasignaletique.com/23574-large_default/plaque-publicite-vache-qui-rit.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      code: 'CODE2',
    },
    {
      title: 'Profitez de -25% sur votre prochain achat.',
      picture_url: 'https://www.toutelasignaletique.com/23574-large_default/plaque-publicite-vache-qui-rit.jpg',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      code: 'CODE3',
    },
    {
      title: 'Profitez de -25% sur votre prochain achat.',
      picture_url: 'https://www.toutelasignaletique.com/23574-large_default/plaque-publicite-vache-qui-rit.jpg',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      code: 'CODE4',
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

  return (
    <View className="h-full flex-col w-full justify-center items-center">
      <View className="justify-center items-center px-[30px] mb-[20px] mt-10">
        <Text className="text-[36px] font-bold text-[#0E3D60] mb-6">Vos offres exclusives</Text>
        <Text className="text-center text-[#0E3D60] text-[16px]">
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
              onPress={() => openModal(offer)}
            />
          ))}
        </ScrollView>
      </View>
      <OfferModal visible={isModalVisible} onClose={closeModal} offer={selectedOffer} />
    </View>
  );
}
