import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import RoleOption from '@/components/RoleOption'; // Assurez-vous que le chemin est correct
import { faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons';

export default function RolePage() {
  const router = useRouter();

  const setUserRole = (role: string) => {
    console.log(`${role} sélectionné`);
    // Ajoutez ici la logique pour gérer la sélection du rôle utilisateur
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Choisissez votre rôle</Text>
      <Text style={styles.description}>Sélectionnez votre profil pour une expérience adaptée à vos besoins.</Text>

      <RoleOption
        icon={faShoppingCart}
        iconColor="#67aba8"
        title="Je suis un "
        highlightTitle="client"
        description="Recevez des offres personnalisées et découvrez les promotions exclusives des commerces près de chez vous."
        onPress={() => {
          setUserRole('client'); // Définir le rôle en tant que "client"
          router.push({
            pathname: '/client/pages/RegisterPage',
            params: { someParam: 'someValue' }
          }); // Rediriger vers la section client
        }}
        backgroundColor="#67aba8"
        textColor="#67aba8"
      />

      <RoleOption
        icon={faStore}
        iconColor="#4e7ac7"
        title="Je suis un "
        highlightTitle="commerçant"
        description="Publiez vos promotions en temps réel, fidélisez vos clients et développez votre activité grâce à nos outils."
        onPress={() => {
          setUserRole('merchant'); // Définir le rôle en tant que "commerçant"
          router.push({
            pathname: '/Merchant/MerchantTutoPage',
            params: { someParam: 'someValue' }
          }); // Rediriger vers la section commerçant
        }}
        backgroundColor="#4e7ac7"
        textColor="#4e7ac7"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
  },
});