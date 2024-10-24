import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

interface Tag {
  id: number;
  name: string;
}

interface TagsSelectorProps {
  tags: Tag[];
}

function TagButton({ id, name }: Tag) {
  const [fontsLoaded] = useFonts({
    Montserrat: require("@/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    MontserratExtraBolt: require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  const onPress = () => {
    return;
  };

  return (
    <TouchableOpacity style={styles.tagsButton} onPress={onPress}>
      <Text style={styles.tagButtonText}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function TagsSelector({ tags }: TagsSelectorProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }} showsVerticalScrollIndicator={false} horizontal={false} showsHorizontalScrollIndicator={false} style={styles.container}>
        {tags.map((tag) => (
          <TagButton name={tag.name} id={tag.id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: -5,
    height: 180,
    borderWidth: 0,
    flexDirection: "row",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagsButton: {
    borderRadius: 50,
    height: 30,
    margin: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  tagsButtonUnselected: {
    borderColor: "#CCCCCC",
    backgroundColor: "#EEEEEE",
  },
  tagsButtonSelected: {
    borderColor: "#CCCCCC",
    backgroundColor: "#EEEEEE",
  },

  tagButtonText: {
    color: "#0E3D60",
    fontSize: 14,
    flexShrink: 1, // Allow text to take only the space it needs
    fontFamily: "Montserrat",
  },
});
