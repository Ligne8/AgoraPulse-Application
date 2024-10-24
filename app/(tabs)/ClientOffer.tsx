import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface ClientOfferProps {
  code: string;
}

function ReturnButton() {
  const onPress = () => {
    // return to previous screen
  };
  return (
    <TouchableOpacity className="flex-row justify-left items-center" onPress={onPress}>
      <FontAwesome name="chevron-left" size={20} color="#CCCCCC" />
      <Text className="pl-2 text-[16px] text-[#CCCCCC]">Retour</Text>
    </TouchableOpacity>
  );
}

export default function ClientOffer({ code }: ClientOfferProps) {
  const [fontsLoaded] = useFonts({
    Montserrat: require("@/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    MontserratExtraBolt: require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  const [qrcode, setQrcode] = React.useState("default");

  const DEFAULT_QRCODE = "AX58C8ST";

  useEffect(() => {
    setQrcode(code || DEFAULT_QRCODE);
  }, []);

  return (
    <View className="h-full w-full justify-center items-center">
      <View className="w-full pl-[22px] mb-[80px]">
        <ReturnButton />
      </View>
      <View className="justify-center items-center px-[36px]">
        <Text className="text-[40px] mb-[22px] font-bold color-[#0E3D60]">Votre Code</Text>
        <Text className="text-[16px] text-center font-bold color-[#0E3D60]">Montrez ce code en caisse pour profiter de votre offre exclusive !</Text>
      </View>
      <View className="justify-center items-center border-[#CCCCCC] bg-[#EEEEEE] border-[1px] rounded-t-[10px] mt-[32px] w-[319px] h-[320px]  p-[42px]">
        <QRCode size={270} value={qrcode} logoSize={20} backgroundColor="#EEEEEE" />
      </View>
      <View className="justify-center items-center w-[319px] bg-[#0E3D60] h-[50px] rounded-b-[10px]">
        <Text className="font-extrabold color-white text-[24px]">{qrcode}</Text>
      </View>
    </View>
  );
}
