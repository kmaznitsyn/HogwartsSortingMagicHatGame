import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AffilationGuessesBox = ({ count, info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

export default AffilationGuessesBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1F1",
    borderWidth: 3,
    borderColor: "black",
    columnGap: 10,
    flex: 1,
  },
  count: {
    fontSize: 26,
    color: "black",
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});
