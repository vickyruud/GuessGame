import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Trying to be sneaky?", "Don't Lie!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.buttonContainer}>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 24,
  },
  buttonContainer: {},
});
