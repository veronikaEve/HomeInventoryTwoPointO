import React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";

import { informationTypes } from "../constants/informationTypes";

const AddSelection = ({ navigation }) => {
  return (
    <View>
      {Object.keys(informationTypes).map((key) => {
        return (
          <ListItem
            key={key}
            onPress={() => navigation.navigate(key)}
            bottomDivider
          >
            <Text>{informationTypes[key]}</Text>
          </ListItem>
        );
      })}
    </View>
  );
};

export default AddSelection;
