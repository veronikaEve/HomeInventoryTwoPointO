import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { getFromDatabase } from "../utils/backendConnections";

const ImageComponent = () => {
  return (
    <View style={styles.imageUpload}>
      <Icon name="camera" size={50} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  imageUpload: {
    margin: 10,
    backgroundColor: "lightgrey",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageComponent;
