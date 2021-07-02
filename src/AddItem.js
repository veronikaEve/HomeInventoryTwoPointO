import React, { useState, Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import { Button, Input, SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const AddItem = ({ navigation, route }) => {
  const [itemDetails, setItemDetails] = useState({});

  //   console.log(itemDetails.name, itemDetails.colour);

  const addItemToDatabase = async () => {
    console.log(itemDetails);
    const body = JSON.stringify(itemDetails);
    fetch("http://192.168.0.101:4000/addItem", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          console.log("happy :)");
        } else {
          console.log("bad :(");
        }
      })
      .catch((err) => console.log("we went wrong", err));
  };

  return (
    <View style={styles.addItemContainer}>
      <Input
        placeholder="Item name"
        onChangeText={(value) =>
          setItemDetails({ ...itemDetails, name: value })
        }
      />
      <Input
        placeholder="Item colour"
        onChangeText={(value) =>
          setItemDetails({ ...itemDetails, colour: value })
        }
      />
      <Button
        style={styles.saveButton}
        icon={<Icon name="check" size={50} color="white" />}
        onPress={() => addItemToDatabase()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addItemContainer: {
    // display: "flex",
    // flexDirection: "column",
    // height: "100%",
  },
  saveButton: {
    // position: "relative",
    padding: 10,
    // justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
});

export default AddItem;
