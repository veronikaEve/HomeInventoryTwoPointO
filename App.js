import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import HomePage from "./src/Home";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on yourself!</Text>
      <StatusBar style="auto" /> */}
      <HomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
