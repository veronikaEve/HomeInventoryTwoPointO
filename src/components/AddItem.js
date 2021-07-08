import React, { useState, useLayoutEffect } from "react";
import { Platform, StyleSheet, View, Alert, TextInput } from "react-native";
import { Button } from "react-native-elements";

import ImageComponent from "./ImageComponent";
import { postToDatabase } from "../utils/backendConnections";

const AddItem = ({ navigation }) => {
  const [itemDetails, setItemDetails] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          style={styles.save}
          onPress={() => handleSubmit()}
          title="Save"
        />
      ),
    });
  });

  const handleSubmit = async () => {
    Alert.alert("Confirm adding this item", "", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const promise = await postToDatabase(itemDetails, "addItem");
          if (promise.statusCode == 200) {
            Alert.alert("✨ Item added successfully ✨", "", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Home"),
              },
            ]);
          }
        },
      },
    ]);
  };

  const itemImage = (image) => {
    setItemDetails({ ...itemDetails, image });
  };

  return (
    <View style={styles.addItemContainer}>
      <View style={styles.details}>
        <ImageComponent getImage={itemImage} inEditMode />
        <View
          style={{
            flexGrow: 1,
          }}
        >
          <TextInput
            style={styles.text}
            placeholder="Item name"
            defaultValue={itemDetails.name}
            onChangeText={(value) =>
              setItemDetails({ ...itemDetails, name: value })
            }
          />
          <TextInput
            style={styles.text}
            placeholder="Notes"
            defaultValue={itemDetails.notes}
            onChangeText={(value) =>
              setItemDetails({ ...itemDetails, notes: value })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addItemContainer: {},
  modalText: {
    marginBottom: 15,
  },
  details: {
    marginTop: 10,
    flexDirection: "row",
  },
  text: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    margin: 10,
    padding: 5,
    fontSize: 20,
  },
  save: {
    marginRight: 10,
  },
});

export default AddItem;
