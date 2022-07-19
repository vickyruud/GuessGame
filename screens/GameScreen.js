import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <Text>Guess</Text>
      <View>
        <Text>Higher or Lower?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
});
