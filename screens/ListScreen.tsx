import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AffilationGuessesBox from "../UI/AffilationGuessesBox";
import { Searchbar } from "react-native-paper";
import PersonageList from "../components/personages/PersonageList";
import { MagicianSortContext } from "../store/magician-sort-context";

const ListScreen = ({}) => {
  const { guessedCharacters, successAffilations, failedAffilations } =
    useContext(MagicianSortContext);

  const totalAffilations = successAffilations + failedAffilations;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [list, setList] = useState([guessedCharacters]);

  useEffect(() => {
    setList(
      guessedCharacters.filter((char) => char.name.includes(searchQuery))
    );
  }, [searchQuery, setList, guessedCharacters]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.guessesRow}>
        <AffilationGuessesBox count={totalAffilations} info={"Total"} />
        <AffilationGuessesBox count={successAffilations} info={"Success"} />
        <AffilationGuessesBox count={failedAffilations} info={"Failed"} />
      </View>

      <Searchbar
        placeholder="Filter characters..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          marginVertical: 12,
        }}
      />

      <PersonageList list={list} />
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  guessesRow: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 12,
  },
});
