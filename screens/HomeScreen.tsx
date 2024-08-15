import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AffilationGuessesBox from "../UI/AffilationGuessesBox";
import HouseButton from "../UI/HouseButton";
import { MagicianSortContext } from "../store/magician-sort-context";
import { Magician } from "../model/Magician";
import { ActivityIndicator } from "react-native-paper";
import {
  GRYFFINDOR,
  HUFFLEPUFF,
  NOT_IN_HOUSE,
  RAVENCLAW,
  SLYTHERING,
} from "../const/house";

const gryffindorImg = require("../assets/departments/Gryffindor.png");
const hufflepuffImg = require("../assets/departments/Hufflepuff.png");
const ravenclawImg = require("../assets/departments/Ravenclaw.png");
const slytherinImg = require("../assets/departments/Slytherin.png");

const questionMark = require("../assets/questionMark.png");

const HomeScreen = () => {
  const {
    getRandomCharacterForGuess,
    isLoading,
    charactersForGuess,
    takeGuess,
    successAffilations,
    failedAffilations,
  } = useContext(MagicianSortContext);

  const [magician, setMagician] = useState<Magician>(new Magician([]));
  const totalAffilations = successAffilations + failedAffilations;

  function refreshHandler() {
    const mgc = getRandomCharacterForGuess();
    setMagician(mgc);
  }

  useEffect(() => {
    if (!isLoading) {
      const mgc = getRandomCharacterForGuess();
      setMagician(mgc);
    }
  }, [isLoading, charactersForGuess, setMagician]);

  let infoView = <ActivityIndicator animating />;

  if (!isLoading) {
    infoView = (
      <React.Fragment>
        <Image
          style={styles.infoImage}
          source={magician.image ? { uri: magician.image } : questionMark}
        />

        <Text style={styles.infoText}>{magician.name}</Text>
      </React.Fragment>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.guessesRow}>
        <AffilationGuessesBox count={totalAffilations} info={"Total"} />
        <AffilationGuessesBox count={successAffilations} info={"Success"} />
        <AffilationGuessesBox count={failedAffilations} info={"Failed"} />
      </View>

      <ScrollView
        contentContainerStyle={styles.info}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshHandler} />
        }
      >
        {infoView}
      </ScrollView>

      <View style={styles.houseButtons}>
        <HouseButton
          house={GRYFFINDOR}
          onPress={() => {
            takeGuess(GRYFFINDOR, magician);
          }}
          imageSource={gryffindorImg}
        />
        <HouseButton
          house={SLYTHERING}
          onPress={() => takeGuess(SLYTHERING, magician)}
          imageSource={slytherinImg}
        />
      </View>
      <View style={styles.houseButtons}>
        <HouseButton
          house={RAVENCLAW}
          onPress={() => takeGuess(RAVENCLAW, magician)}
          imageSource={ravenclawImg}
        />
        <HouseButton
          house={HUFFLEPUFF}
          onPress={() => takeGuess(HUFFLEPUFF, magician)}
          imageSource={hufflepuffImg}
        />
      </View>
      <View style={styles.notInHouseButton}>
        <HouseButton
          house={"Not in House"}
          onPress={() => takeGuess(NOT_IN_HOUSE, magician)}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 10,
  },
  guessesRow: {
    flexDirection: "row",
    gap: 5,
    paddingTop: 10,
  },
  houseButtons: {
    flex: 0.7,
    flexDirection: "row",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 5,
  },
  infoImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  notInHouseButton: {
    height: "15%",
  },
  guessed: {
    backgroundColor: "green",
    transition: "all .5s ease",
  },
});
