import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const questionMark = require("../../assets/questionMark.png");

const PersonageItem = ({ magician }) => {
  const { image, name, attempts, isGuessed } = magician;
  const navigation = useNavigation();

  const pressItemHandler = () => {
    navigation.navigate("DetailsScreen", magician);
  };

  let buttons = (
    <View style={styles.buttonRow}>
      <IconButton
        icon="reload"
        size={30}
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <Icon source="close-circle-outline" color="red" size={30} />
    </View>
  );

  if (isGuessed) {
    buttons = <Icon source="check-circle-outline" color="green" size={30} />;
  }

  return (
    <Pressable
      onPress={pressItemHandler}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.mainInfo}>
        <Image
          style={styles.image}
          source={image ? { uri: image } : questionMark}
        />

        <View>
          <Text style={styles.name}>{name}</Text>
          <Text>Attempts: {attempts}</Text>
        </View>
      </View>
      {buttons}
    </Pressable>
  );
};

export default PersonageItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  image: {
    width: 60,
    height: 85,
    borderRadius: 5,
    marginRight: 5,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.9,
  },
});
