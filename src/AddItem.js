import React, { useState, Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import { Button, SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const AddItem = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default AddItem;
