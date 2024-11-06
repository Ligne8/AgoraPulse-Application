import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function DisplayCodePage(validCode: boolean) {
  return (
    <View className="flex-col justify-around items-center h-full mt-5 p-4">
      <View className="rounded w-3/4 p-1" style={{ backgroundColor: validCode ? '#2ECC71' : '#E74C3C' }}>
        <Text className="text-center text-white font-extrabold text-xl">AX58C9ST</Text>
      </View>

      <View className="flex-col items-center justify-center mb-5">
        {validCode ? (
          <AntDesign name="checkcircle" size={256} color="#2ECC71" />
        ) : (
          <AntDesign name="closecircle" size={256} color="#E74C3C" />
        )}
        <Text className=" text-[#0E3D60] font-extrabold text-4xl pt-5">
          {validCode ? 'Code valide' : 'Code invalide'}
        </Text>
        <Text className=" text-[#0E3D60] text-xl p-5 text-center">
          {validCode
            ? 'Le code est valide. L’offre peut être appliquée pour le client.'
            : 'Le code saisi est incorrect ou a déjà été utilisé.'}
        </Text>
      </View>

      <TouchableOpacity>
        <View className="items-center justify-center mt-7 w-[339px] h-[65px]  bg-[#0E3D60] rounded-[20px]">
          <Text className="font-bold text-[20px] text-white ">Continuer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

/**
 * @params {boolean} validCode, {string} code
 * true if the code is valid, false otherwise
 * @constructor
 */
export default function ValidCodePage() {
  return DisplayCodePage(true);
}
