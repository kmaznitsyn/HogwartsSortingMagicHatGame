import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { MagicianSortContext } from "../store/magician-sort-context";

const ResetButtonWrapper = () => {
  const { onReset } = useContext(MagicianSortContext);

  return <Button onPress={onReset}>Reset</Button>;
};

export default ResetButtonWrapper;

const styles = StyleSheet.create({});
