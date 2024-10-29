import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFonts } from "expo-font";
import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import CustomButton from "@/components/CustomButton";
import PulsatingIcon from "@/components/PulsatingIcon";
import { faSearch, faBellSlash } from "@fortawesome/free-solid-svg-icons";

SplashScreen.preventAutoHideAsync();

/*function ReturnButton() {
  const onPress = () => {
    // return to previous screen
      console.log("Return to previous screen")
  };
  return (
    <TouchableOpacity className="flex-row justify-left items-center" onPress={onPress}>
      <FontAwesome name="chevron-left" size={20} color="#CCCCCC" />
      <Text className="pl-2 text-[16px] text-[#CCCCCC]">Retour</Text>
    </TouchableOpacity>
  );
}*/

export default function ClientHome() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("@/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    MontserratExtraBolt: require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
  });


  if (!fontsLoaded) {
    return null;
  }

  const handleDisableNotifications = () => {
    // Disable notifications
    console.log("Notifications désactivées");
  };
  /*<View style={styles.searchIcon}>
        <FontAwesomeIcon icon={faSearch} size={80} color="#FFFFFF" />
      </View>*/

  return (
   <View style={styles.container}>
      <PulsatingIcon
        icon={faSearch}
        iconSize={150}
        iconColor="#FFFFFF"
        circleSize={200}
        circleColor="#2A9BE2"
        animationDuration={1200}
      />
      <Text style={styles.title}>Recherche activée</Text>
      <Text style={styles.description}>
        Promenez-vous dans la rue et recevez en temps réel des offres personnalisées des commerces autour de vous.
      </Text>
      <Text style={styles.note}>
        Restez à l'affût, les bonnes affaires sont juste à côté !
      </Text>

      <CustomButton
        title="Désactiver les notifications"
        onPress={handleDisableNotifications}
        backgroundColor="#0E3D60"
        textColor="#FFFFFF"
        icon={faBellSlash}
        iconColor="#FFFFFF"
        style={{ paddingVertical: 15, paddingHorizontal: 30, bottom: 20, position: "absolute" }}
        textStyle={{ fontSize: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchIcon: {
    backgroundColor: "#0E3D60",
    padding: 30,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    color: "#0E3D60",
    fontSize: 35,
    fontFamily: "MontserratExtraBolt",
    marginBottom: 10,
    marginTop: 100,
    textAlign: "center",
  },
  description: {
    color: "#0E3D60",
    fontSize: 16,
    fontFamily: "Montserrat",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  note: {
    color: "#0E3D60",
    fontSize: 16,
    fontFamily: "Montserrat",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
});