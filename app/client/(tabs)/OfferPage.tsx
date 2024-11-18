import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface Offer {
  title: string;
  picture_url: string;
  code: string;
}

export function Offer({ title, picture_url }: Offer) {
  return (
    <View className="mb-[10px] w-[332px]">
      <View className="justify-around items-center flex-row w-[332px] h-[120px] border-[1px] border-[#CCCCCC] bg-[#EEEEEE] rounded-t-[10px]">
        <Image className="w-[100px] h-[100px] rounded-[5px]" source={{ uri: picture_url }} />
        <Text className="text-[18px] text-[#0E3D60] font-semibold w-[202px]">{title}</Text>
      </View>
      <View className="rounded-b-[10px] bg-[#0E3D60] ">
        <TouchableOpacity className="flex-row justify-center items-center h-[30px] ">
          <FontAwesome name="qrcode" size={20} color="white" />
          <Text className="ml-3 rounded-b-[1px] bg-[#0E3D60]  text-white font-bold text-[14px] ">Voir le code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function OfferPage() {
  const [offers] = React.useState<Offer[]>([
    {
      title: 'Profitez de -10% sur votre prochain pack de 24 canettes.',
      picture_url:
        'https://images.affiches-et-posters.com//albums/3/55722/medium/affiche-vintage-perrier-villemot-7411.jpg',
      code: 'CODE1',
    },
    {
      title: 'Profitez de -25% sur votre prochain achat.',
      picture_url: 'https://www.toutelasignaletique.com/23574-large_default/plaque-publicite-vache-qui-rit.jpg',
      code: 'CODE1',
    },
    {
      title: 'Profitez de -25% sur votre prochain achat.',
      picture_url: 'https://www.toutelasignaletique.com/23574-large_default/plaque-publicite-vache-qui-rit.jpg',
      code: 'CODE1',
    },
    {
      title: 'Profitez de -25% sur votre prochain achat.',
      picture_url: 'https://www.toutelasignaletique.com/23574-large_default/plaque-publicite-vache-qui-rit.jpg',
      code: 'CODE1',
    },
  ]);

  return (
    <View className="h-full flex-col w-full justify-center items-center">
      <View className="justify-center items-center px-[30px] mb-[20px] mt-10">
        <Text className="text-[36px] font-bold text-[#0E3D60] mb-6">Vos offres exclusives</Text>
        <Text className="text-center text-[#0E3D60] text-[16px]">
          Découvrez les promotions des commerces que vous avez rencontrés aujourd&apos;hui. Profitez-en avant
          qu&apos;elles ne disparaissent !
        </Text>
      </View>
      <View className=" h-[450px]">
        <ScrollView className=" " showsVerticalScrollIndicator={false}>
          {offers.map((offer, index) => (
            <Offer key={index} title={offer.title} picture_url={offer.picture_url} code={offer.code} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
