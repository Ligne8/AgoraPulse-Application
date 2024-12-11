import React, { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import CameraScanner from '@/components/CameraScanner';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { router, SplashScreen } from 'expo-router';
import { getUserId } from '@/backend/client';
import supabase from '@/backend/supabase';

const REGEX_CODE = /^[A-Z0-9]{8}$/;

export default function ScanCodePage() {
  // eslint-disable-next-line
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  // ask for camera permission
  useEffect(() => {
    if (!isPermissionGranted) {
      requestPermission();
    }
  }, [isPermissionGranted, requestPermission]);
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

  const onPress = async () => {
    if (code == '') {
      return;
    }
    if (!REGEX_CODE.test(code)) {
      router.push({
        pathname: '/Merchant/pages/ValidCodePage',
        params: { validCode: 'false', code: code, ads_id: '' },
      });
      return;
    }
    const res = await supabase.from('UsersAds').select('ads_id, scanned_at').eq('code', code);
    if (res.data == null || res.data.length == 0 || res.data[0].scanned_at != null) {
      router.push({
        pathname: '/Merchant/pages/ValidCodePage',
        params: { validCode: 'false', code: code },
      });
      return;
    }
    const ads_id = res.data[0].ads_id;
    const userId = await getUserId();
    // eslint-disable-next-line
    const { data, error } = await supabase.from('Ads').select('*, Store (*)').eq('id', ads_id);
    if (data == null || data.length == 0) {
      router.push({
        pathname: '/Merchant/pages/ValidCodePage',
        params: { validCode: 'false', code: code },
      });
      return;
    }
    console.log(data[0].Store.user_id, userId);
    if (data[0].Store.user_id != userId) {
      router.push({
        pathname: '/Merchant/pages/ValidCodePage',
        params: { validCode: 'false', code: code },
      });
      return;
    }
    router.push({
      pathname: '/Merchant/pages/ValidCodePage',
      params: { validCode: 'true', code: code },
    });
    return;
  };

  return (
    <KeyboardAvoidingView behavior="position" className="flex-1 bg-[#F5F5F5]">
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
  },
});
