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
    <TouchableOpacity
      className="flex-row rounded-xl border border-[#E74C3C] items-center py-2 px-[80] mb-5"
      onPress={handleDisconnection}
    >
      <Text className=" text-[#E74C3C] font-montserrat">Déconnexion</Text>
    </TouchableOpacity>
  );
};

export default DisconnectButton;
