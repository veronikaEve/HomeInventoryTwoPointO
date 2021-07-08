import React, { useState, useLayoutEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Alert,
  Text,
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";

import ImageComponent from "./ImageComponent";
import { postToDatabase } from "../utils/backendConnections";

const ViewItem = ({ navigation, route }) => {
  const item = route.params.item;
  const [inEditMode, setInEditMode] = useState(false);
  const [itemDetails, setItemDetails] = useState(item || {});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item.name,
      headerRight: () =>
        inEditMode ? (
          <Button
            style={styles.headerRight}
            onPress={() => handleSubmit()}
            title="Save"
          />
        ) : (
          <Button
            style={styles.headerRight}
            onPress={() => setInEditMode(true)}
            title="Edit"
          />
        ),
    });
  });

  const handleSubmit = async () => {
    Alert.alert("Confirm update", "", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const promise = await postToDatabase(itemDetails, "updateItem");
          if (promise.statusCode == 200) {
            Alert.alert("✨ Item updated successfully ✨", "", [
              {
                text: "OK",
                onPress: () => setInEditMode(false),
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
        <ImageComponent
          getImage={itemImage}
          item={item}
          inEditMode={inEditMode}
        />
        <View
          style={{
            flexGrow: 1,
          }}
        >
          {inEditMode ? (
            <View>
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
          ) : (
            <View>
              <Text style={styles.text}>{itemDetails.name}</Text>
              <Text style={styles.text}>{itemDetails.notes}</Text>
            </View>
          )}
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
  headerRight: {
    marginRight: 10,
  },
});

export default ViewItem;
