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
    <View className="absolute top-0 left-0 right-0 bg-white z-10">
      <TouchableOpacity
        className="flex-row items-center p-4 pt-14"
        onPress={() => {
          handleReturn();
        }}
      >
        <FontAwesome name="chevron-left" size={20} color="#CCCCCC" />
        <Text className="pl-2 text-lg text-gray-400">Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReturnButton;
