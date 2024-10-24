import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import CustomButton from "@/components/CustomButton"; // Importe ton composant bouton
import WelcomeScreen from "./welcompage";

SplashScreen.preventAutoHideAsync();

export default function index() {
  return <>{WelcomeScreen}</>;
}
