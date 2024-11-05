import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { router } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
    const [fontsLoaded] = useFonts({
        Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
        MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    });

    const [images, setImages] = useState(Array(6).fill(null)); // Initialize 6 empty slots for images

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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const newImages = [...images];
            newImages[index] = imageUri;
            setImages(newImages);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <FontAwesomeIcon icon={faChevronLeft} size={18} color="#CCCCCC"/>
                <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Ajoutez des photos</Text>
            <Text style={styles.subtitle}>Mettez en avant votre commerce en ajoutant des images qui attirent vos
                clients.</Text>

            <View style={styles.imageGrid}>
                {images.map((image, index) => (
                    <TouchableOpacity key={index} style={styles.imageSlot} onPress={() => pickImage(index)}>
                        {image ? (
                            <Image source={{uri: image}} style={styles.image}/>
                        ) : (
                            <Text style={styles.plusIcon}>+</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/Merchant/pages/TutoPage')}>
                <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 16,
        color: '#B0B0B0',
        fontFamily: 'MontserratExtraBolt',
        marginLeft: 5,
    },
    title: {
        fontSize: 40,
        fontFamily: 'MontserratExtraBolt',
        color: '#0E3D60',
        textAlign: 'center',
        marginBottom: 10,
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
        fontFamily: 'MontserratBolt',
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
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'MontserratBold',
    },
});
