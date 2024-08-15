import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PersonageItem from "./PersonageItem";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Magician } from "../../model/Magician";

const PersonageList = ({ list }: { list: Magician[] }) => {
  const naviagation = useNavigation();

  if (!list || list.length === 0) {
    return (
      <View>
        <Text style={styles.emptyListText}>
          There are no attempts for affiltations
        </Text>
        <Button
          style={{
            borderRadius: 10,
            padding: 5,
            alignSelf: "center",
            marginTop: 12,
          }}
          mode="elevated"
          onPress={() => naviagation.navigate("HomeScreen")}
          uppercase
        >
          Go to magician affilations
        </Button>
      </View>
    );
  }

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => <PersonageItem magician={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PersonageList;

const styles = StyleSheet.create({
  emptyListText: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
  },
});
