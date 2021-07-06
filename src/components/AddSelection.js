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
            onPress={() => navigation.navigate(key)}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title>{informationTypes[key]}</ListItem.Title>
            </ListItem.Content>
            {/* <Text>{informationTypes[key]}</Text> */}
            <ListItem.Chevron />
          </ListItem>
        );
      })}
    </View>
  );
};

export default AddSelection;
