import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { getStoreId, Picture, savePicture, savePictureBucket } from '@/backend/client';
import { decode } from 'base64-arraybuffer';
import ReturnButton from '@/components/ReturnButton';

SplashScreen.preventAutoHideAsync();

interface ImagePicked {
  uri: string;
  name: string;
  type: string;
  base64: string;
}

export default function RegisterPage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  const [images, setImages] = useState<ImagePicked[]>(Array(6).fill(null)); // Initialize 6 empty slots for images

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const pickImage = async (index: number) => {
    // Request camera roll permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const asset = result.assets[0];
      const image_name: string = asset.fileName ?? '';
      const type = asset.mimeType ?? 'image/jpeg';
      const base64 = asset.base64 ?? '';
      const i: ImagePicked = { uri: imageUri, name: image_name, type: type, base64: base64 };
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = i;
        return newImages;
      });
    }
  };

  const handlePress = async () => {
    if (images.every((image) => image === null)) {
      alert('Veuillez ajouter au moins une image');
      return;
    }
    const storeId = await getStoreId();
    for (const image of images) {
      if (!image) continue;
      const payload: Picture = { store_id: storeId, image_name: image.name, type: image.type };
      try {
        await savePicture(payload);
      } catch (error) {
        console.log(error);
        alert(error);
        return;
      }
      try {
        await savePictureBucket(image.name, storeId, decode(image.base64), image.type);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    router.push('/Merchant/pages/TutoPage');
  };

  return (
    <View style={styles.container}>
      <ReturnButton />
      <ScrollView>
        <Text style={styles.title}>Ajoutez des photos</Text>
        <Text style={styles.subtitle}>
          Mettez en avant votre commerce en ajoutant des images qui attirent vos clients.
        </Text>

        <View style={styles.imageGrid}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} style={styles.imageSlot} onPress={() => pickImage(index)}>
              {image ? (
                <Image source={{ uri: image.uri }} style={styles.image} />
              ) : (
                <Text style={styles.plusIcon}>+</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontFamily: 'MontserratExtraBold',
    color: '#0E3D60',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 70,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#0E3D60',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageSlot: {
    width: '48%',
    height: 150,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    borderWidth: 1,
  },
  plusIcon: {
    fontFamily: 'MontserratBold',
    fontSize: 48,
    color: '#888888',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#0E3D60',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
});
