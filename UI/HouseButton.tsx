import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const HouseButton = ({
  onPress,
  house,
  imageSource,
}: {
  onPress: () => void;
  house: string;
  imageSource?: any;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View>
        {imageSource && <Image style={styles.image} source={imageSource} />}

        <Text style={styles.house}>{house}</Text>
      </View>
    </Pressable>
  );
};

export default HouseButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    borderWidth: 3,
    borderColor: "black",
    textAlign: "center",
    columnGap: 10,
    alignItems: "center",
    margin: 8,
    justifyContent: "center",
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
  },
  house: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});
