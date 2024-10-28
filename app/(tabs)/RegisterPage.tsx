import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import React, {useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
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

    return (<View style={styles.container}>
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                testID="logo"
            />
            <Text style={[styles.title, {textAlign: 'center'}]}>Inscription</Text>
            <Text style={styles.description}>
                Créez votre compte pour profiter de nos services.
            </Text>
            <EntryField
                icon={faUser}
                title="Prénom"
                placeholder="Entrez votre prénom"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
            />
            <EntryField
                icon={faUser}
                title="Nom"
                placeholder="Entrez votre nom"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
            />
            <EntryField
                icon={faEnvelope}
                title="Email"
                placeholder="Entrez votre adresse email"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
            />
            <EntryField
                icon={faLock}
                title="Mot de passe"
                placeholder="Entrez votre mot de passe"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
                secureText={true}
            />
            <EntryField
                icon={faLock}
                title="Confirmer votre mot de passe"
                placeholder="Confirmez votre mot de passe"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
                secureText={true}
            />
            <CustomButton
                title="S'inscrire"
                onPress={() => console.log('S\'inscrire')}
                backgroundColor="#0E3D60"
                textColor="#FFFFFF"
                width="100%"
            />
            <Text style={styles.hint}>
                Vous avez déjà un compte ? <Text style={{fontWeight: 'bold'}}>Connectez-vous ici</Text>
            </Text>
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
        marginBottom: 10,
        marginTop: 0,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 0,
    },
    description: {
        color: '#0E3D60',
        fontSize: 16,
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginBottom: 20,
    },
    hint: {
        color: '#0E3D60',
        fontSize: 13.5,
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginBottom: 40,
    }
});