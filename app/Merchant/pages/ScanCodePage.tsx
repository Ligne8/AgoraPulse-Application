import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import CameraScanner from './CameraScanner';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';

const REGEX_CODE = /^[A-Z0-9]{8}$/;

export default function ScanCodePage() {
  // eslint-disable-next-line
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  const [code, setCode] = React.useState<string>('');

  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onPress = () => {
    if (code == '') {
      return;
    }
    if (!REGEX_CODE.test(code)) {
      alert('Code invalide');
      return;
    }

    // TODO: call API to check code

    //const props: ValidCodePageProps = { validCode: true, code: code };
  };

  return (
    <View className="">
      <View className="h-[600px] w-full">
        {isPermissionGranted ? <CameraScanner setCode={setCode} code={code} /> : <></>}
      </View>
      <View className="px-5 mt-6 ">
        <Text style={styles.text} className="text-[#0E3D60] text-[20px] font-bold">
          Des difficultés à scanner ?
        </Text>
        <Text style={styles.text} className="mt-1 text-[#0E3D60] text-[14px]">
          Entrez le code manuellement
        </Text>
        <View className="mt-3 pl-5 flex-row justify-between items-center w-[342px] h-[40px] border-[#CCCCCC] rounded-md border-[1px] border-r-0 bg-[#EEEEEE]">
          <TextInput
            style={styles.text}
            value={code}
            onChangeText={(e) => setCode(e)}
            placeholder="Code de l'annonce (ex: AX58C9ST)"
          />
          <TouchableOpacity onPress={onPress}>
            <View
              style={{}}
              className="w-[40px] h-[40px] bg-red-300 justify-center items-center rounded-md bg-[#0E3D60]"
            >
              <AntDesign style={{ fontWeight: 'bold' }} name="right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
  },
});
