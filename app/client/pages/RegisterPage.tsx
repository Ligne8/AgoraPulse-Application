import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TagsSelector } from '@/components/tagsSelector';
import { useRouter } from 'expo-router';
import { getAllTags, saveUserTags } from '../../../backend/client';

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  const [tags, setTags] = React.useState([]);

  const fetchTags = async () => {
    try {
      let data = await getAllTags();
      data = data.map((tag) => {
        return { ...tag, selected: false };
      });
      setTags(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  const onPress = async () => {
    const selectedTags = tags.filter((tag: any) => tag.selected);
    if (selectedTags.length < 3) {
      alert('Veuillez sélectionner au moins 3 centres d’intérêt');
    }
    try {
      await saveUserTags(selectedTags);
      console.log('Saved user tags');
    } catch (e) {
      console.error('Error saving user tags: ', e);
    }
    router.push('/client/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Personnalisez votre expérience</Text>
        <Text style={styles.subtitle}>
          Sélectionnez vos centres d’intérêt pour recevoir des offres et promotions adaptées à vos préférences.
        </Text>
      </View>
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitle}>Sélectionnez au moins 3 centres d’intérêt</Text>
        <TagsSelector tags={tags} setTags={setTags} />
      </View>
      <View>
        <Text style={styles.addtagsTitle}>Vous n’avez pas trouvé ce qui vous intéresse ?</Text>
        <Text style={styles.addTagsSubtitle}>
          Ajoutez vos propres préférences ci-dessous pour une expérience encore plus personnalisée.
        </Text>
        <View>
          <View style={styles.addTagsInputBox}>
            <TextInput placeholder="Ajouter un centre d’intérêt" />
          </View>
          <TouchableOpacity style={styles.addTagsButton} onPress={() => {}}>
            <Text style={styles.addTagsButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.addTagsButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
}

RegisterPage.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  tagsContainer: {
    width: '100%',
    paddingHorizontal: 22,
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    paddingTop: 70,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  tagsTitle: {
    color: '#0E3D60',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'MontserratBold',
  },
  subtitle: {
    color: '#0E3D60',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    color: '#0E3D60',
    fontSize: 36,
    fontWeight: 800,
    textAlign: 'center',
    fontFamily: 'MontserratExtraBold',
    marginBottom: 30,
  },
  addtagsTitle: {
    color: '#0E3D60',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'MontserratBold',
    paddingHorizontal: 18,
    marginBottom: 5,
  },
  addTagsSubtitle: {
    color: '#0E3D60',
    fontFamily: 'Montserrat',
    textAlign: 'left',
    paddingHorizontal: 18,
    fontSize: 14,
  },
  addTagsButton: {
    width: 320,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#0E3D60',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  addTagsInputBox: {
    width: 320,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    marginHorizontal: 'auto',
    marginTop: 20,
    marginBottom: 10,
  },
  addTagsButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'MontserratBold',
  },

  nextButton: {
    width: 339,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#0E3D60',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
});
