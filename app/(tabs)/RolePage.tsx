import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useLayoutEffect, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '@/components/CustomButton';
import {faShoppingCart, faStore} from '@fortawesome/free-solid-svg-icons';
import RoleOption from '@/components/RoleOption';

SplashScreen.preventAutoHideAsync();

export default function RolePage() {
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

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: {display: 'none'},
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Text style={[styles.title, {textAlign: 'center'}]}>Choisissez votre rôle</Text>
            <Text style={styles.description}>
                Sélectionnez votre profil pour une expérience adaptée à vos besoins.
            </Text>

            <RoleOption
                icon={faShoppingCart}
                iconColor="#67aba8"
                title="Je suis un "
                highlightTitle="client"
                description="Recevez des offres personnalisées et découvrez les promotions exclusives des commerces près de chez vous."
                onPress={() => console.log('Client sélectionné')}
                backgroundColor="#67aba8"
                textColor="#67aba8"
            />

            <RoleOption
                icon={faStore}
                iconColor="#4e7ac7"
                title="Je suis un "
                highlightTitle="commerçant"
                description="Publiez vos promotions en temps réel, fidélisez vos clients et développez votre activité grâce à nos outils."
                onPress={() => console.log('Commerçant sélectionné')}
                backgroundColor="#4e7ac7"
                textColor="#4e7ac7"
            />

            <CustomButton
                title="Suivant"
                onPress={() => console.log('Suivant')}
                backgroundColor="#0E3D60"
                textColor="#FFFFFF"
                width="100%"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        color: '#0E3D60',
        fontSize: 38,
        fontFamily: 'MontserratExtraBolt',
        marginBottom: 15,
        marginTop: 70,
    },
    description: {
        color: '#0E3D60',
        fontSize: 16,
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginBottom: 40,
    }
});
