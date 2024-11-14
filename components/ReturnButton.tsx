import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ReturnButton = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };

  return (
    <View className="absolute top-8 left-0 p-4 ml-3 z-10">
      <TouchableOpacity
        className="flex-row justify-left items-center"
        onPress={() => {
          handleReturn();
        }}
      >
        <FontAwesome name="chevron-left" size={20} color="#CCCCCC" />
        <Text className="pl-2 text-[16px] text-[#CCCCCC]">Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReturnButton;
