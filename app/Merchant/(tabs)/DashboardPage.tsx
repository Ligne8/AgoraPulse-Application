import { Image, Text, View } from 'react-native';
import React from 'react';

export default function DashboardPage() {
  return (
    <View>
      <View className="mt-24 justify-center items-center">
        <Text className="text-center text-[36px] text-[#0E3D60] font-montserrat-extra-bold mx-4">
          Votre tableau de bord
        </Text>
        <Text className="text-[16px] text-center text-[#0E3D60] mx-4 mt-4">
          Suivez vos performances et optimisez vos annonces pour maximiser l&apos;impact de votre commerce !
        </Text>
      </View>
      <View className="flex justify-center items-center w-full pt-10 flex-wrap flex-row ">
        <View className="p-1 flex-col justify-between w-[157px] h-[86px] mr-4 bg-[#0ED290]/[0.1] border-[1px] border-[#0ED290] rounded-[10px]">
          <Text className="font-montserrat-semi-bold text-[#0ED290] ">Annonces actives</Text>
          <Text className="text-right text-[36px]  font-montserrat-bold">3</Text>
        </View>
        <View className="p-1 flex-col justify-between w-[157px] h-[86px] bg-[#2A9BE2]/[0.1] border-[1px] border-[#2A9BE2] rounded-[10px]">
          <Text className="font-montserrat-semi-bold text-[#2A9BE2] ">Taux de conversion</Text>
          <Text className="text-right text-[36px]  font-montserrat-bold">28%</Text>
        </View>
        <View className="p-1 flex-col mt-7 justify-between w-[157px] h-[86px] mr-4 bg-[#F9A232]/[0.1] border-[1px] border-[#F9A232] rounded-[10px]">
          <Text className="font-montserrat-semi-bold text-[#F9A232] ">Vue des annonces</Text>
          <Text className="text-right text-[36px]  font-montserrat-bold">3</Text>
        </View>
        <View className="p-1 flex-col justify-between w-[157px] h-[86px] bg-[#D476E2]/[0.1] border-[1px] border-[#D476E2] rounded-[10px]">
          <Text className="font-montserrat-semi-bold text-[#D476E2] ">Points de fidélité attribués</Text>
          <Text className="text-right text-[36px]  font-montserrat-bold">10K</Text>
        </View>
      </View>
      <View className="flex justify-center items-center mt-1">
        <Image source={require('@/assets/images/graph.png')}></Image>
      </View>
    </View>
  );
}
