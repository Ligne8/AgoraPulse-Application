import { Text, Touchable, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

interface Offer {
  title: string;
  picture_url: string;
  code: string;
}

function Offer({ title, picture_url, code }: Offer) {
  return (
    <View>
      <View className="justify-around items-center flex-row w-[332px] h-[150px] border-[1px] border-[#CCCCCC] bg-[#EEEEEE] rounded-t-[10px]">
        <Image className="w-[100px] h-[100px]" source={{ uri: picture_url }} />
        <Text>{title}</Text>
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

export default function ClientOfferPage() {
  const [offers, setOffers] = React.useState<Offer[]>([
    {
      title: "Profitez de -10% sur votre prochain pack de 24 canettes.",
      picture_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmq2UEg06velNCEXAmNnT3-yLbR4telWaJfQ&s",
      code: "CODE1",
    },
  ]);

  return (
    <View className="h-full w-full justify-center items-center">
      <View className="justify-center items-center px-[30px] mb-[20px]">
        <Text className="text-[36px] font-bold text-[#0E3D60] mb-6">Vos offres exclusives</Text>
        <Text className="text-center text-[#0E3D60] text-[16px]">Découvrez les promotions des commerces que vous avez rencontrés aujourd'hui. Profitez-en avant qu’elles ne disparaissent !</Text>
      </View>
      <View>
        {offers.map((offer) => (
          <Offer title={offer.title} picture_url={offer.picture_url} code={offer.code} />
        ))}
      </View>
    </View>
  );
}
