import React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";

import { informationTypes } from "../constants/informationTypes";

const AddSelection = ({ navigation }) => {
  return (
    <View style={{ paddingTop: 20 }}>
      {Object.keys(informationTypes).map((key) => {
        return (
          <ListItem
            key={key}
            onPress={() => navigation.navigate(informationTypes[key].add)}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title>{informationTypes[key].type}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        );
      })}
    </View>
  );
};

export default AddSelection;
