import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import React, {useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {faShop, faNavicon, faGlobe} from '@fortawesome/free-solid-svg-icons';
import EntryField from '@/components/EntryField';
import CustomButton from '@/components/CustomButton';
import CustomPicker from '@/components/CustomPicker';
import AddressField from '@/components/AddressFields';


SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
    const [fontsLoaded] = useFonts({
        Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
        MontserratExtraBolt: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
        MontserratBlack: require('@/assets/fonts/Montserrat-Black.ttf'),
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
            <Text style={[styles.title, {textAlign: 'center'}]}>Complétez votre profil</Text>
            <Text style={styles.description}>
                Ajoutez les informations sur votre commerce afin que vos clients vous trouvent facilement.
            </Text>
            <Text style={styles.sectionTitle}>Informations principales
            </Text>
            <EntryField
                icon={faShop}
                title="Nom du commerce"
                placeholder="Entrez le nom de votre commerce"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
                marginBottom={10}
            />
            <EntryField
                icon={faNavicon}
                title="Description"
                placeholder="Présenter brièvement votre commerce"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
                multiline={true}
                marginBottom={10}
            />
            <CustomPicker
                title="Sélectionner un type"
                items={[
                    {label: 'Restaurant', value: 'restaurant'},
                    {label: 'Café', value: 'cafe'},
                    {label: 'Boutique', value: 'boutique'},

                ]}
                backgroundColor="#f2f2f2"
                textColor="#0E3D60"
                iconColor="#0E3D60"
                selectedItemColor="#1A3D5D"
                onValueChange={(value) => console.log('Selected:', value)}/>
            <Text style={styles.sectionTitle}>Autres informations
            </Text>
            <EntryField
                icon={faGlobe}
                title="Site internet"
                placeholder="Entrez l’adresse de votre site internet"
                backgroundColor="#f2f2f2"
                descriptionColor="#6c7a93"
                marginBottom={10}
            />
            <AddressField/>
            <CustomButton
                title="Suivant"
                onPress={() => console.log('Suivant')}
                backgroundColor="#0E3D60"
                textColor="#FFFFFF"
                width="100%"
                marginBottom={0}
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
        fontSize: 37,
        fontFamily: 'MontserratExtraBolt',
        marginBottom: 5,
        marginTop: 0,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 0,
    },
    description: {
        color: '#0E3D60',
        fontSize: 14,
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        color: '#0E3D60',
        fontSize: 20,
        fontFamily: 'MontserratBlack',
        textAlign: 'center',
        marginBottom: 5,
    },
});