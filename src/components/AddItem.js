import React, { useState, useLayoutEffect } from "react";
import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";

import ImageComponent from "./ImageComponent";
import { postToDatabase } from "../utils/backendConnections";
import { modalStyles } from "../styles/modalStyles";

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
    const promise = await postToDatabase(itemDetails, "addItem");

    if (promise.statusCode == 200) {
      Alert.alert("Confirm adding this item", "", [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: () =>
            Alert.alert("✨ Item addedd successfully ✨", "", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Home"),
              },
            ]),
        },
      ]);
    }
  };

  const itemImage = (image) => {
    setItemDetails({ ...itemDetails, image });
  };

  return (
    <View style={styles.addItemContainer}>
      <View style={styles.details}>
        <ImageComponent getImage={itemImage} />
        <View
          style={{
            flexGrow: 1,
          }}
        >
          <Input
            placeholder="Item name"
            onChangeText={(value) =>
              setItemDetails({ ...itemDetails, name: value })
            }
          />
          <Input
            multiline
            placeholder="Notes"
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
  ...modalStyles,
  addItemContainer: {},
  modalText: {
    marginBottom: 15,
  },
  details: {
    marginTop: 10,
    flexDirection: "row",
  },
  save: {
    marginRight: 10,
  },
});

export default AddItem;
