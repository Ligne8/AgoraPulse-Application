import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ReturnButton from '@/components/ReturnButton';
import { router, useLocalSearchParams } from 'expo-router';
import supabase from '@/backend/client';

export interface DisplayCodePageProps {
  validCode: string;
  code: string;
}

function DisplayCodePage() {
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>('AX58C9ST');
  const data = useLocalSearchParams();
  const p = data as unknown as DisplayCodePageProps;

  const updateAds = async (code: string) => {
    await supabase.from('UsersAds').update({ scanned_at: new Date() }).eq('code', code);
  };

  useEffect(() => {
    setCode(p.code);
    setIsValidCode(p.validCode == 'true' ? true : false);
    if (p.validCode == 'true') {
      updateAds(p.code);
    }
  }, [data.validCode]);

  return (
    <View className="flex-col justify-around items-center h-full mt-5 p-4">
      <View className="rounded w-3/4 p-1" style={{ backgroundColor: isValidCode ? '#2ECC71' : '#E74C3C' }}>
        <Text className="text-center text-white font-extrabold text-xl">{code}</Text>
      </View>

      <View className="flex-col items-center justify-center mb-5">
        {isValidCode ? (
          <AntDesign name="checkcircle" size={256} color="#2ECC71" />
        ) : (
          <AntDesign name="closecircle" size={256} color="#E74C3C" />
        )}
        <Text className=" text-[#0E3D60] font-extrabold text-4xl pt-5">
          {isValidCode ? 'Code valide' : 'Code invalide'}
        </Text>
        <Text className=" text-[#0E3D60] text-xl p-5 text-center">
          {isValidCode
            ? 'Le code est valide. L’offre peut être appliquée pour le client.'
            : 'Le code saisi est incorrect ou a déjà été utilisé.'}
        </Text>
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <View className="items-center justify-center mt-7 w-[339px] h-[65px]  bg-[#0E3D60] rounded-[20px]">
          <Text className="font-bold text-[20px] text-white ">Continuer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export interface ValidCodePageProps {
  validCode: string;
  code: string;
}

/**
 * @params {boolean} validCode, {string} code
 * true if the code is valid, false otherwise
 * @constructor
 */
export default function ValidCodePage(props: ValidCodePageProps) {
  return (
    <>
      <ReturnButton />
      <DisplayCodePage validCode={props.validCode} code={props.code} />
    </>
  );
}
