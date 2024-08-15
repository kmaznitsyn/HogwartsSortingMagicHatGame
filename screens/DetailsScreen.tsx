import { Image, StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import React, { useLayoutEffect } from "react";

const questionMark = require("../assets/questionMark.png");

const DetailsScreen = ({ route, navigation }) => {
  const { name, image, house, dateOfBirth, actor, species, isGuessed } =
    route.params;

  let fallbackView = (
    <Surface style={styles.surface} elevation={4}>
      <Text style={styles.surfaceText}>
        You are not allowed to see info about this character
      </Text>
    </Surface>
  );

  if (isGuessed) {
    fallbackView = (
      <View style={styles.fallbackView}>
        <Text>House: {house}</Text>
        <Text>Date of birth: {dateOfBirth}</Text>
        <Text>Actor: {actor}</Text>
        <Text>Species: {species}</Text>
      </View>
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image ? { uri: image } : questionMark}
      />
      {fallbackView}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 25,
    paddingHorizontal: 8,
    gap: 5,
  },
  image: {
    flex: 1,
    width: 210,
    height: 250,
  },
  fallbackView: {
    flex: 1,
  },
  surface: {
    flex: 1,
    padding: 8,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  surfaceText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
