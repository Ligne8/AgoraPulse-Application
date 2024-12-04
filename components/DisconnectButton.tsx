import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import supabase from '@/backend/client';
import { useRouter } from 'expo-router';

const DisconnectButton = () => {
 const navigate = useRouter();
 const handleDisconnection = async () => {
   const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      return;
    }
    navigate.push('/LoginPage');
 };

  return (
    <TouchableOpacity className="flex-row align-middle pt-2 pb-2 pr-24 pl-24 rounded-xl border border-[#E74C3C] " onPress={handleDisconnection}>
      <Text className=" text-[#E74C3C]">Déconnexion</Text>
    </TouchableOpacity>
  );
};

export default DisconnectButton;